import PrismChunk, { PCChunk } from "prismarine-chunk";
import { Vec3 } from "vec3";
type TChunk = PCChunk

export enum Dimension {
    Overworld = 0,
    Nether = -1,
    TheEnd = 1
};

export class Difficulty {
    public static Peaceful = 0
    public static Easy = 1
    public static Normal = 2
    public static Hard = 3

    value: number = 0;
    #events: Function[] = [];

    #changed(value: number) {
        this.#events.forEach(e => e(value));
    }

    onChange(func: (value: number) => any) {
        this.#events.push(func);
    };

    set(value: number) {
        this.#changed(this.value = value);
    };

    get() {
        return this.value;
    };
};

export interface WorldOptions {
    worldName: string,
    dimension?: "overworld" | "nether" | "the_end"
    spawn: Vec3
    version?: string
};

export default class World {
    chunks = new Map<string, TChunk>();
    Chunk: TChunk;

    options: WorldOptions

    get size() { return this.chunks.size; };
    get dimension() { return this.options.dimension || "overworld"; };
    get worldName() { return this.options.worldName || `world_${Math.random().toString(36).slice(8)}`; };
    get spawn() { return this.options.spawn || new Vec3(0, 0, 0); };
    get version() { return this.options.version || "1.19.3"; };

    constructor(options: WorldOptions = { spawn: new Vec3(0, 0, 0), worldName: "world" }) {
        this.options = options;

        // @ts-ignore
        this.Chunk = PrismChunk(this.options.version);
    };


    getChunk(x: number, z: number) {
        return this.chunks.get(`${x},${z}`);
    };

    deleteChunk(x: number, z: number) {
        return this.chunks.delete(`${x},${z}`);
    };

    loadChunk(chunkPacket: any) {
        if (!chunkPacket.bitMap && chunkPacket.groundUp)
            return;

        // @ts-ignore
        const column = new this.Chunk({ minY: -64, worldHeight: 384, x: chunkPacket.x, z: chunkPacket.z, });

        try { // @ts-ignore
            column.load(Buffer.from(chunkPacket.chunkData.data), chunkPacket.bitMap, true, chunkPacket.groundUp);

            if (chunkPacket.loadBiomes) // @ts-ignore
                column.loadBiomes(chunkPacket.biomes);

            if (chunkPacket.skyLight) // @ts-ignore
                column.loadParsedLight(chunkPacket.skyLight, chunkPacket.blockLight, chunkPacket.skyLightMask, chunkPacket.blockLightMask, chunkPacket.emptySkyLightMask, chunkPacket.emptyBlockLightMask);

            // @ts-ignore
            this.chunks.set(`${chunkPacket.x},${chunkPacket.z}`, column);
        } catch (err) {
            console.error("Error during loading chunk x:", chunkPacket.x, "z:", chunkPacket.z, "/", "error:", err);
        };
    };
}