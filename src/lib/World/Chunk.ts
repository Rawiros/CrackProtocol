import type { ChunkState } from '../../types';
import type { PCChunk } from "prismarine-chunk";
import type { Block } from 'prismarine-block';
import type Entity from '../entity/Entity';
import type Player from '../entity/Player';
import type CrackServer from "../../index";
import type { Vec3 } from 'vec3';
import type World from './World';
import path from "path";
import { writeFileSync } from 'fs';

const ChunkConstructors = new Map<string, Chunk>();
const fromBuffer = value => Array.isArray(value) ? value.map(e => Array.from(e)) : void 0;

const adjustChunkPos = (pos: Vec3) => {
    if ((pos.z = pos.z % 16) < 0)
        pos.z += 16;

    if ((pos.x = pos.x % 16) < 0)
        pos.x += 16;

    return pos;
};

const getConstructor = (version: string) => {
    return class Chunk extends (require("prismarine-chunk")(version) as typeof PCChunk) {
        constructor(world: World, server: CrackServer, x: number, z: number) {
            super({
                minY: -64,
                worldHeight: 384
            });

            const regionX = Math.floor(x / 16);
            const regionZ = Math.floor(z / 16);
            const chunkPath = path.join(world.chunksDir, `${x},${z}.json`);

            Object.defineProperties(this, {
                x: { get() { return x } },
                z: { get() { return z } },
                world: { get() { return world } },
                server: { get() { return server } },
                regionX: { get() { return regionX } },
                regionZ: { get() { return regionZ } },
                chunkPath: { get() { return chunkPath } }
            });
        };

        private _state: ChunkState;
        get state() { return this._state; }

        readonly world: World;
        readonly server: CrackServer;
        readonly chunkPath: string;

        readonly x: number;
        readonly z: number;

        readonly regionX: number;
        readonly regionZ: number;

        readonly players = new Map<string, Player>;
        readonly entities = new Map<string, Entity>;

        getBlockStateId(pos: Vec3) { return super.getBlockStateId(adjustChunkPos(pos)); }
        getBlockType(pos: Vec3) { return super.getBlockType(adjustChunkPos(pos)); }
        getBlockData(pos: Vec3) { return super.getBlockData(adjustChunkPos(pos)); }
        getBlockLight(pos: Vec3) { return super.getBlockLight(adjustChunkPos(pos)); }
        getSkyLight(pos: Vec3) { return super.getSkyLight(adjustChunkPos(pos)); }
        getBiome(pos: Vec3) { return super.getBiome(adjustChunkPos(pos)); }

        setBiome(pos: Vec3, biome: number) { super.setBiome(adjustChunkPos(pos), biome); }
        setBlock(pos: Vec3, block: Block) { super.setBlock(adjustChunkPos(pos), block); };
        setBlockStateId(pos: Vec3, stateId: number) { return super.setBlockStateId(adjustChunkPos(pos), stateId); }
        setBlockType(pos: Vec3, id: number) { super.setBlockType(adjustChunkPos(pos), id); }
        setBlockData(pos: Vec3, data: Buffer) { super.setBlockData(adjustChunkPos(pos), data); }
        setBlockLight(pos: Vec3, light: number) { super.setBlockLight(adjustChunkPos(pos), light); }
        setSkyLight(pos: Vec3, light: number) { super.setSkyLight(adjustChunkPos(pos), light); }

        get isLoaded() { return this._state === "loaded"; };
        get isLoading() { return this._state === "loading"; };
        get isUnloaded() { return this._state === "unloaded"; };

        get asPacket() {
            const lights = this.dumpLight() as any;

            return {
                x: this.x,
                z: this.z,
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
                    data: Array.from(this.dump())
                },
                blockEntities: [],
                trustEdges: false,
                skyLightMask: lights?.skyLightMask,
                blockLightMask: lights?.blockLightMask,
                emptySkyLightMask: lights?.emptySkyLightMask,
                emptyBlockLightMask: lights?.emptyBlockLightMask,
                skyLight: fromBuffer(lights?.skyLight),
                blockLight: fromBuffer(lights?.blockLight)
            };
        };

        load(): void {
            if (this._state === "loaded")
                return;

            const data = require(this.chunkPath);

            if (!data.bitMap && data.groundUp)
                return;
            try {
                super.load(Buffer.from(data.chunkData.data), data.bitMap, true, data.groundUp);

                if (data.loadBiomes)
                    this.loadBiomes(data.biomes);

                if (data.skyLight)
                    this.loadLightParse(data.skyLight, data.blockLight, data.skyLightMask, data.blockLightMask, data.emptySkyLightMask, data.emptyBlockLightMask);
            } catch (err) {
                console.error("Error during loading chunk x:", data.x, "z:", data.z, "/", "error:", err);
            };
        }
        unload(): void {
            if (this._state !== "loaded")
                return;

            this._state = "unloaded";

            this.save();

            delete this['biome'];
            delete this['sections'];
            delete this['skyLightSent'];
        }
        save(): void {
            if (this._state !== "loaded")
                return;

            writeFileSync(this.chunkPath, JSON.stringify(this.asPacket), "utf-8")
        };
    };
}

export type TChunk = ReturnType<typeof getConstructor>['prototype'];
export type Chunk = ReturnType<typeof getConstructor>;

export default (version: string) => ChunkConstructors.has(version) ? ChunkConstructors.get(version) : (ChunkConstructors.set(version, getConstructor(version)).get(version));