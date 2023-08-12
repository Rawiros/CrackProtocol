// @ts-nocheck
import fs from "fs";
import path from "path";
import CrackServer from "../../index";
import type { TChunk } from "./Chunk"

export default class Region {
    server: CrackServer
    x: number
    z: number

    constructor(server: CrackServer, worldDir: string, x: number, z: number) {
        const regionDir = path.join(worldDir, "regions", `${x},${z}`);
        const chunks = fs.readdirSync(regionDir).filter(e => e.endsWith(".json")).map(e => e.split(",").map(parseFloat));

        this.server = server;
        this.x = x;
        this.z = z;

        for (const [x, z] of chunks)
            this.loadChunk(require(path.join(regionDir, `${x},${z}.json`)));
    };

    chunks = new Map<string, TChunk>;

    loadChunk(data: any) {
        if (!data.bitMap && data.groundUp)
            return;

        const column = new this.server.Chunk(data.x, data.z);

        try {
            column.load(Buffer.from(data.chunkData.data), data.bitMap, true, data.groundUp);

            if (data.loadBiomes)
                column.loadBiomes(data.biomes);

            if (data.skyLight)
                column.loadParsedLight(data.skyLight, data.blockLight, data.skyLightMask, data.blockLightMask, data.emptySkyLightMask, data.emptyBlockLightMask);

            this.chunks.set(`${data.x},${data.z}`, column);
        } catch (err) {
            console.error("Error during loading chunk x:", data.x, "z:", data.z, "/", "error:", err);
        };
    };

    unload(): void {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.Unload();
    };

    save(): void {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.Save();
    };
}