import { ChunkState } from '../../types';
import { PCChunk } from "prismarine-chunk";

export default class Chunk extends PCChunk {
    state: ChunkState;

    x: number;
    z: string;

    regionX: number;
    regionZ: number;

    players = new Map<string, any>;
    entities = new Map<string, any>;

    get isLoaded() { return this.state === "loaded"; };
    get isLoading() { return this.state === "loading"; };
    get isUnloaded() { return this.state === "unloaded"; };

    load(): void { }
    unload(): void { }
    save(): void { };

    constructor() {
        super({
minY: 64,
worldHeight: 264
        })
    }
}