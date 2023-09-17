import path from "path";
import type CrackServer from "../../index";
import type { LevelData } from "src/types";
import type { Block } from 'prismarine-block';
import type { TChunk } from "./Chunk";
import type { Vec3 } from "vec3";

export default class World {
    readonly server: CrackServer
    readonly level: LevelData
    readonly name: string;
    readonly chunks = new Map<string, TChunk>;

    readonly chunksDir: string;

    constructor(server: CrackServer, worldDir: string) {
        const level: LevelData = require(path.join(worldDir, "level.json"));
        const chunksDir: string = path.join(worldDir, "chunks");

        Object.defineProperties(this, {
            server: { get() { return server } },
            level: { get() { return level } },
            name: { get() { return level.name } },
            chunksDir: { get() { return chunksDir } }
        });

        // const regions = fs.readdirSync(path.join(worldDir, "regions")).map(e => e.split(",").map(parseFloat));

        // for (const [x, z] of regions)
        // this.regions.set(`${x},${z}`, new Region(server, world_dir, x, z));
    };

    getChunk(x: number, z: number): TChunk { return this.chunks.get(`${x},${z}`) };
    getBlockAt(position: Vec3): Block {
        const chunk = this.getChunk(Math.floor(position.x / 16), Math.floor(position.z / 16));

        if (chunk)
            return chunk.getBlock(position);

        return null;
    };

    save() {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.save();
    }
};