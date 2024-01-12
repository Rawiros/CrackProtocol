import path from 'path';
import { make_weak_cached } from 'utility'
import { Anvil, IAnvil, level as Level } from 'prismarine-provider-anvil';
import createRecursiveProxy from '../utils/recursiveProxy';
import { PCChunk } from 'prismarine-chunk';
import { readdirSync } from 'fs';

// 
// const world = path.join(__dirname, "..", "..", "tests");
const world = path.join(__dirname, "..", "..", "tests/New World");

export interface WorldOptions {
    root: string
    world?: {
        /**
         * @default "1.18"
         */
        version?: string

        /**
         * @default true
         */
        initializeLevel?: boolean
    }
}

export interface ChunksOptions {
    regionsRoot: string

    /**
     * @default "1.18"
     */
    version?: string
}

class Chunks {
    #world: World;
    readonly regionsPaths: string;
    readonly lastChunkWrite: Date = new Date(0);

    constructor(world: World, { regionsRoot, version = "1.18" }: ChunksOptions) {
        Object.defineProperty(this, "#world", { get() { return world; }, });

        const regions = readdirSync(regionsRoot).filter(/r\..{0,10}\.mca/.test);

        console.log(regions)

    }
}

export default class World {
    private paths: Record<"regions" | "root" | "level", string> = {} as any;
    readonly level: any;
    private anvil: IAnvil;
    private cached_chunks = make_weak_cached(
        (key: string) => {
            const { x, z } = chunk_from_index(key);

            return this.anvil.load(x, z); //as Promise<PCChunk>
        },
        () => void 0
    );

    constructor(o: WorldOptions) {
        const that = this;

        Object.defineProperties(this.paths, { root: { value: o.root }, regions: { value: path.join(o.root, "region") }, level: { value: path.join(o.root, "level.dat") } });
        Object.defineProperty(this, 'anvil', { value: new (Anvil(o.world?.version || "1.18"))(this.paths.regions) });

        if (typeof o.world?.initializeLevel !== 'boolean')
            o.world = { ...o.world, initializeLevel: true };

        if (o.world?.initializeLevel)
            this.initializeLevel();

        const chunks = make_weak_cached(
            key => {
                const { x, z } = chunk_from_index(key);

                return that.anvil.load(x, z);
            },
            () => void 0
        );

        Object.defineProperty(this, 'getChunk', {
            value: async (x: number, z: number) => chunks(`${x}:${z}`)
        })
    }

    private async initializeLevel() {
        Object.defineProperties(this, {
            initializeLevel: { value: () => void 0 },
            level: {
                value: createRecursiveProxy(await Level.readLevel(this.paths.level), target => Level.writeLevel(this.paths.level, target))
            }
        });
    }

    async getChunk(x: number, z: number): Promise<PCChunk> {
        return this.cached_chunks(`${x}:${z}`);
    }

    async getChunkPacket(x: number, z: number) {
        const chunk: PCChunk = await this.cached_chunks(`${x}:${z}`);
        const lights = chunk.dumpLight() as any;

        return {
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
            skyLight: convertNestedArrays(lights?.skyLight),
            blockLight: convertNestedArrays(lights?.blockLight)
        };
    };
};

// erroruje gowno xd trzeba znow patcha zrobic section.block_states.palette.length
// air jako blockstates i taiga jako biome
new World({ root: world }).getChunkPacket(0, 0).then(chunk => {
    console.log(chunk)//.getBlock(new Vec3(0, 62, 0)))
})
////['anvil'].getAllChunksInRegion(0, 0).then(console.log)


export const convertNestedArrays = (value) => Array.isArray(value) ? value.map(e => Array.from(e)) : void 0;

export function chunk_from_index(index: string) {
    const [x, z] = index.split(':');
    return { x: +x, z: +z }
};

export const chunk_position = (value: number) => Math.floor(value / 16)

export function surrounding_chunks({ position, view_distance }) {
    const chunks = []
    const { x, z } = position
    const chunkX = chunk_position(x)
    const chunkZ = chunk_position(z)
    for (let dx = -view_distance; dx <= view_distance; dx++) {
        for (let dz = -view_distance; dz <= view_distance; dz++) {
            chunks.push({
                x: chunkX + dx,
                z: chunkZ + dz,
            })
        }
    }
    return chunks
}

// https://github.com/aresrpg/aresrpg/blob/master/src/core/chunk.js#L81
export function fix_light(chunk: PCChunk) {
    for (let x = 0; x < 16; x++) {
        for (let z = 0; z < 16; z++) {
            for (let y = 0; y < 256; y++) {
                chunk.setSkyLight({ x, y, z } as any, 15)
                chunk.setBlockLight({ x, y, z } as any, 15)
            }
        }
    }
}