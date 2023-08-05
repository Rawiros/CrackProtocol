import Chunk from "./Chunk"

export default class Region {
    private _options;
    x: number
    z: number

    chunks = new Map<string, Chunk>;
    unload(): void {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.unload();
    };

    save(): void {
        for (const chunk of Array.from(this.chunks.values()))
            chunk.save();
    };
}