import { ServerClient } from "minecraft-protocol";
import Entity from "./Entity";
import type Custom from '../packets/Custom';
import Login from "../packets/Login";
import Tags from "../packets/Tags";
import FeatureFlags from "../packets/FeatureFlags";
import Position from "../packets/Position";
import Difficulty from "../packets/Difficulty";
import SpawnPosition from "../packets/SpawnPosition";
import { to256 } from "../utils/Math";
import Server from "../structures/server";
import { Vec3 } from "vec3";
import { PCChunk } from "prismarine-chunk";

interface SocketProfile {
    id: string
    name: string
    properties: { name: string, value: string, signature: string }[]
    profileActions: any[]
}

const cache = new Map<string, string>();
const normalize = (value: string) => value.split("_").map(e => e[0].toUpperCase().concat(e.slice(1))).join("");

const shit = value => Array.isArray(value) ? value.map(e => Array.from(e)) : void 0;
function getChunkPacket(x: number, z: number, chunk: PCChunk) {
    const lights = chunk.dumpLight() as any;

    return ({
        x,
        z,
        heightmaps: {
            type: 'compound',
            name: '',
            value: {
                MOTION_BLOCKING: { type: 'longArray', value: new Array(37).fill([0, 0]) },
                WORLD_SURFACE: { type: 'longArray', value: new Array(37).fill([0, 0]) }
            }
        },
        chunkData: {
            type: "Buffer",
            data: Array.from(chunk.dump())
        },
        blockEntities: [],
        trustEdges: false,
        skyLightMask: lights?.skyLightMask,
        blockLightMask: lights?.blockLightMask,
        emptySkyLightMask: lights?.emptySkyLightMask,
        emptyBlockLightMask: lights?.emptyBlockLightMask,
        skyLight: shit(lights?.skyLight),
        blockLight: shit(lights?.blockLight)
    });
};

export default class Player extends Entity {
    constructor(server: Server, socket: ServerClient) {
        super();

        this.socket = socket;
        this.server = server;
        this.UUID = this.socket.uuid;
        this.entityId = this.socket.id;

        this.socket.on("packet", (data, meta) => {
            if (!cache.has(meta.name))
                cache.set(meta.name, normalize(meta.name));

            const name = `on${cache.get(meta.name)}`;
            console.log(name);

            for (const pluginInstance of this.server.plugins) {
                const eventHandler = pluginInstance[name];
                console.log(name, eventHandler, pluginInstance);

                if (eventHandler)
                    eventHandler(this, { meta, data });
            };
        });

        // @ts-ignore
        this.socket.on("position", ({ x, y, z, onGround }) => (this.onGround = onGround, this['_position'].set(x, y, z)));

        // @ts-ignore
        this.socket.on("position_look", ({ x, y, z, onGround, pitch, yaw }) => (this.onGround = onGround, this['_position'].set(x, y, z), this['_yaw'] = to256(yaw), this['_pitch'] = to256(pitch)));

        // @ts-ignore
        this.socket.on("look", ({ pitch, yaw, onGround }) => (this.onGround = onGround, this['_yaw'] = to256(yaw), this['_pitch'] = to256(pitch)));
        this.socket.on("flying", ({ onGround }) => this.onGround = onGround);
        this.socket.on("flying", ({ onGround }) => this.onGround = onGround);
    };

    socket: ServerClient

    get latency() { return this.socket.latency };
    get username() { return this.socket.username };
    get version() { return this.socket.version };
    get profile() { return this.socket.profile as SocketProfile };
    get protocolVersion() { return this.socket.protocolVersion };

    message(text: string, isActionBar = false) {
        return this.writePacket("system_chat", {
            isActionBar,
            content: JSON.stringify({ text })
        });
    };

    /**
     * Will send all vanilla packets to the player
     */
    login() {
        const spawn = new Vec3(0, 350, 0);

        const login = new Login()
            .setEntityid(this.entityId);

        this.send(login);
        this.send(new Difficulty());
        this.send(new Tags());
        this.send(new FeatureFlags());
        this.send(new SpawnPosition().setLocation(spawn));
        this.send(new Position().setX(spawn.x).setZ(spawn.z).setY(spawn.y));

        // Force sending update_health packet 
        this.food = this.food;
    };

    sendChunk(x: number, z: number, chunk: PCChunk) {
        // console.log(getChunkPacket(x, z, chunk));
        return this.socket.write("map_chunk", getChunkPacket(x, z, chunk));
    };

    resendCurrentChunk() {
        const chunk = this.chunk;

        if (chunk)
            this.sendChunk(this.chunkX, this.chunkZ, chunk);
    }

    send(packet: Custom) {
        if (packet.cancelled)
            return;

        this.socket.write(packet.name, packet.data);
    };

    writePacket(packetName: string, packetData: any) { return this.socket.write(packetName, packetData); };

    toString() { return `Player{UUID=${this.UUID}}` };
};