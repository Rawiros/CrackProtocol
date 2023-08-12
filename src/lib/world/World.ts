import fs from "fs";
import path from "path";
import CrackServer from "../../index";
import type { LevelData } from "src/types";
import type { TChunk } from "./Chunk";
import Region from "./Region";

export default class World {
    server: CrackServer
    level: LevelData
    regions = new Map<string, Region>();

    constructor(server: CrackServer, worldDir: string) {
        this.server = server;

        const level: LevelData = this.level = require(path.join(worldDir, "level.json"));
        const regions = fs.readdirSync(path.join(worldDir, "regions")).map(e => e.split(",").map(parseFloat));

        for (const [x, z] of regions)
            this.regions.set(`${x},${z}`, new Region(server, worldDir, x, z));
    }

    getChunk(x: number, z: number): TChunk { return this.getRegion(0, 0).chunks.get(`${x},${z}`) };
    getRegion(x: number, z: number): Region { return this.regions.get(`${x},${z}`) };
}