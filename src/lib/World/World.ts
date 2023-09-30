import path from "path";
import type CrackServer from "../../index";
import type { LevelData } from "src/types";
import type { Block } from 'prismarine-block';
import type { TChunk } from "./Chunk";
import type { Vec3 } from "vec3";
import { readdirSync } from "fs";
import ContainerManager from "./ContainerManager";

export default class World {
    readonly server: CrackServer
    readonly level: LevelData
    readonly name: string;
    readonly chunks = new Map<string, TChunk>;
    readonly chunksDir: string;
    readonly worldDir: string;
    readonly isReadOnly: boolean;
    readonly containers: ContainerManager;

    constructor(server: CrackServer, worldDir: string) {
        const level: LevelData = require(path.join(worldDir, "level.json"));
        const chunksDir: string = path.join(worldDir, "chunks");
        const readonly = level.readonly === undefined ? false : level.readonly;

        Object.defineProperties(this, {
            server: { get() { return server } },
            level: { get() { return level } },
            name: { get() { return level.name } },
            chunksDir: { get() { return chunksDir } },
            isReadOnly: { get() { return readonly } },
            worldDir: { get() { return worldDir } },
        });

        const containers = new ContainerManager(server, this);
        Object.defineProperty(this, "containers", { get() { return containers } });

        const chunks = readdirSync(chunksDir).map(e => Array.from(e.match(/-?\d+(\.\d+)?/g)).map(parseFloat));

        for (const [x, z] of chunks) {
            const column = new this.server.Chunk(this, server, x, z);

            this.chunks.set(`${x},${z}`, column);
            column.load();
        };
    };

    getChunk(x: number, z: number): TChunk { return this.chunks.get(`${x},${z}`) };
    getChunkFromPosition(pos: Record<"x" | "z", number>): TChunk { return this.chunks.get(`${Math.floor(pos.x / 16)},${Math.floor(pos.z / 16)}`) };

    getBlockAt(position: Vec3): Block {
        const chunk = this.getChunk(Math.floor(position.x / 16), Math.floor(position.z / 16));

        if (chunk)
            return chunk.getBlock(position);

        return null;
    };

    save() {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.save();
    };
};