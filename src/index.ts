import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

(function patchModule() {
    const rule = /(var|let) nextId.{0,10}\d+/i;
    const rule2 = /=.{0,10}nextId\+\+/i;
    const modulePath = require.resolve("minecraft-protocol");

    const serverFile = path.join(modulePath || "unknown", "..", "server.js");

    if (!existsSync(serverFile))
        return;

    const content = readFileSync(serverFile, "utf8");
    const matched = content.match(rule);

    if (!matched)
        return;

    const patched = content.replace(rule, "self.nextId = 0;").replace(rule2, "= self.nextId++;");

    writeFileSync(serverFile, patched);

})();

import 'utility';
import { readdirSync } from "fs";
import Protocol from "minecraft-protocol";
import World from "./lib/world/World";
import { ServerSocket, ServerOptions, PacketHandleFunc } from "./types"
import Player from './lib/entity/Player';
import { Logger } from 'tslog';
import ChunkInit, { Chunk } from "./lib/world/Chunk";
import os from 'os';
import { Vec3 } from "vec3";

interface MemoryUsage {
    percentage: number;
    value: number;
}

function getHeapMemoryUsage(): MemoryUsage {
    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem();

    const heapUsed = memoryUsage.heapUsed;
    const percentage = heapUsed / totalMemory;

    return {
        percentage,
        value: percentage * 100, // Convert to percentage (0 to 100)
    };
}

new Logger({
    name: "Server",
    displayLoggerName: false,
    overwriteConsole: true,
    displayFilePath: "hidden",
    displayDateTime: true,
    dateTimePattern: "hour:minute:second.millisecond",
    displayFunctionName: false,
});

console.log = console.info;

class CrackServer {
    _socket: ServerSocket;
    events = new Map<string, Set<PacketHandleFunc>>();

    options: ServerOptions;
    players = new Map<string, Player>();
    worlds = new Map<string, World>;
    Chunk: Chunk

    startTime: number;

    get version() { return this._socket.version; };

    constructor(options: ServerOptions) {
        const startTime = this.startTime = Date.now();
        const socket = (this._socket = Protocol.createServer(this.options = options), this._socket);

        // setInterval(() => console.log("Proc Title ->", process.title), 1500);
        // setInterval(() => console.log(Object.keys(socket.clients)), 1500);

        this._initialize();
        this._registerPacketHandler();
        this._registerEvents();

        console.log("CrackProtocol is now ready, everything took", process.uptime().toFixed(2), "s");
        console.log(this.toString());
    };

    on(name: string, func: PacketHandleFunc) {
        if (!this.events.has(name))
            this.events.set(name, new Set());

        this.events.get(name).add(func);
    };

    private _initialize() {
        const Home = path.join(__dirname, "..");
        const Worlds = path.join(Home, "worlds");

        this.Chunk = ChunkInit(this.version);

        for (const worldName of readdirSync(Worlds)) {
            const worldDir = path.join(Worlds, worldName);
            const world = new World(this, worldDir)

            this.worlds.set(worldName, world);

            console.log(`Loaded world named "${world.level.name}" from the "${worldDir}" path`);
        };

        console.info("CrackProtocol Server Initialized!");
        console.log("Server found", this.worlds.size, "worlds and loaded them");
    };

    private _registerPacketHandler() {
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

    private _registerEvents() {
        this.on("settings", (player, data) => player.settings = data);

        this.on("block_place", (player, data) => {
            const pos = new Vec3(data.location.x, data.location. y, data.location.z);

            const chunk = player.chunk;
            if (!chunk) return;

            const block = chunk.getBlock(pos);
            if (!block) return;

            console.log("Block Place Packet", data);
            player.message(`§4[!] §7Block at §b${pos.toString()} §7is §b${block.displayName} §b(${block.name}) §7State Id §b${block.stateId} §7Metdata §b${block.metadata}`);
        })

        this.on("flying", (player, { onGround }) => player.onGround = onGround);

        this.on("position", (player, { x, y, z, onGround }) => {
            player['_position'].set(x, y, z);
            player.onGround = onGround;

            // const block = player.chunk.getBlock(player.position);
            // process.title = `${player.position.floored().toString()} - ${block.displayName} (${block.name})`;
        });

        this.on("position_look", (player, { x, y, z, onGround, pitch, yaw }) => {
            player['_position'].set(x, y, z);
            player['_yaw'] = Math.toByte(yaw);
            player['_pitch'] = Math.toByte(pitch);

            player.onGround = onGround;
        });

        this.on("look", (player, { pitch, yaw, onGround }) => {
            player['_yaw'] = Math.toByte(yaw);
            player['_pitch'] = Math.toByte(pitch);

            player.onGround = onGround;
        });

        console.info("Registeried Default Player Events");
    };

    toString() {
        return `CrackServer{PID=${process.pid};VERSION=${this.version};WORLDS=${Array.from(this.worlds.keys()).join(",")}}`
    }
};

export { default as BossBarAction } from './lib/util/BossBarAction'
export { default as EntityType } from './lib/util/EntityType'

export default CrackServer;