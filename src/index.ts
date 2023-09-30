import 'utility';
import path from 'path';
import './lib/util/patching';
import { Vec3 } from 'vec3';
import Protocol from 'minecraft-protocol';
import ChunkInitialization, { Chunk, TChunk } from './lib/World/Chunk';
import Player from './lib/entity/Player';
import { ServerSocket, ServerOptions, PacketHandleFunc, WritePacketOptions } from './types';
import { World } from './lib/World';
import { readdirSync } from 'fs';

class CrackServer {
    private _socket: ServerSocket;
    private _startTime: number;
    private _chunk: Chunk;
    private _options: ServerOptions;

    events = new Map<string, Set<PacketHandleFunc>>();

    readonly players = new Map<string, Player>();
    readonly worlds = new Map<string, World>;

    get version() { return this._socket.version }
    get startTime() { return this._startTime }
    get Chunk(): Chunk { return this._chunk }
    get options() { return this._options }

    constructor(options: ServerOptions) {
        this._startTime = Date.now();
        this._socket = Protocol.createServer(this._options = options);
        this._chunk = ChunkInitialization(this.version);

        this.initialize();
        this.registerPacketHandler();
        this.registerEvents();

        console.log("CrackProtocol is now ready, everything took", process.uptime().toFixed(2), "s");
    };

    private initialize() {
        const worldsDir = path.join(__dirname, "../worlds");
        const worlds = readdirSync(worldsDir);

        for (const folderDir of worlds) {
            const worldDir = path.join(worldsDir, folderDir);
            const world = new World(this, worldDir);

            this.worlds.set(folderDir, world);
            console.log("Loaded world", worldDir);
        };

        console.log("Server loaded", this.worlds.size, "worlds");
        console.info("CrackProtocol Server Initialized!");
    };

    on(name: string, func: PacketHandleFunc) {
        if (!this.events.has(name))
            this.events.set(name, new Set());

        this.events.get(name).add(func);
    };

    registerPlugin(plugin: any) {
        try {
            
        } catch (err) {
            console.error(err);

            return false;
        } finally {
            return true;
        }
    };

    private registerPacketHandler() {
        const handlePlayerPacket = (client: Protocol.ServerClient) => {
            const plr = this.players.set(client.uuid, new Player(this, client as any)).get(client.uuid);

            plr.login();

            client.on("packet", (data, packetMeta): void => {
                if (!this.events.has(packetMeta.name))
                    return;

                for (const _event of this.events.get(packetMeta.name))
                    _event(this.players.get(client.uuid), data, packetMeta);
            });
        };

        this._socket.on("login", handlePlayerPacket);

        console.info("Registeried CrackProtocol Packet Handler");
    };

    private registerEvents() {
        // listen for settings change
        this.on("settings", (player, data) => player['_settings'] = data);

        this.on("block_place", (player, data) => {
            const pos = new Vec3(data.location.x, data.location.y, data.location.z);

            const chunk = player.world.getChunkFromPosition(pos);

            if (!chunk)
                return;

            const block = chunk.getBlock(pos);

            if (!block)
                return;

            console.log("Block Place Packet", data);
            player.message(`§4[!] §7Block at §b${pos.toString()} §7is §b${block.displayName} §b(${block.name}) §7State Id §b${block.stateId} §7Metdata §b${block.metadata}`);
        })

        // Listen to packet which is sent by client when player is flying
        this.on("flying", (player, { onGround }) => player.onGround = onGround);

        // Listen for player's position change
        this.on("position", (player, { x, y, z, onGround }) => {
            player['_position'].set(x, y, z);
            player.onGround = onGround;
        });

        // Listen for player's position change and head rotation change
        this.on("position_look", (player, { x, y, z, onGround, pitch, yaw }) => {
            player['_position'].set(x, y, z);
            player['_yaw'] = Math.toByte(yaw);
            player['_pitch'] = Math.toByte(pitch);

            player.onGround = onGround;
        });

        // Listen just for player's head rotation change
        this.on("look", (player, { pitch, yaw, onGround }) => {
            player['_yaw'] = Math.toByte(yaw);
            player['_pitch'] = Math.toByte(pitch);

            player.onGround = onGround;
        });

        console.info("Registeried Default Player Events");
    };

    all(options: WritePacketOptions) { this._socket.writeToClients(Object.values(this._socket.clients), options.name, options.data); };

    toString() {
        return `CrackServer{PID=${process.pid};VERSION=${this.version};WORLDS=${Array.from(this.worlds.keys()).join(",")}}`
    }
};

export { default as BossBarAction } from './lib/util/BossBarAction'
export { default as EntityType } from './lib/util/EntityType'

export default CrackServer;