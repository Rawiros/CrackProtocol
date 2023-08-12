// @ts-nocheck
import { ChunkState } from '../../types';
import { PCChunk } from "prismarine-chunk";
import Entity from '../entity/Entity';
import Player from '../entity/Player';
import { Vec3 } from 'vec3';
import { Block } from 'prismarine-block';

const ChunkConstructors = new Map<string, Chunk>();
const fromBuffer = value => Array.isArray(value) ? value.map(e => Array.from(e)) : void 0;

const adjustChunkPos = (pos: Vec3) => {
    if ((pos.z = pos.z % 16) < 0)
        pos.z += 16;

    if ((pos.x = pos.x % 16) < 0)
        pos.x += 16;

    return pos;
};

const getConstruct = (version: string) => {
    return class Chunk extends (require("prismarine-chunk")(version) as typeof PCChunk) {
        constructor(x: number, z: number) {
            super({
                minY: -64,
                worldHeight: 384
            });

            this.x = x;
            this.z = z;
        };

        state: ChunkState;

        x: number;
        z: number;

        regionX: number;
        regionZ: number;

        players = new Map<string, Player>;
        entities = new Map<string, Entity>;


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

        get isLoaded() { return this.state === "loaded"; };
        get isLoading() { return this.state === "loading"; };
        get isUnloaded() { return this.state === "unloaded"; };

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

        Load(): void { }
        Unload(): void { }
        Save(): void { };
    };
}

export type TChunk = ReturnType<typeof getConstruct>['prototype'];
export type Chunk = ReturnType<typeof getConstruct>;

export default (version: string) => ChunkConstructors.has(version) ? ChunkConstructors.get(version) : (ChunkConstructors.set(version, getConstruct(version)).get(version));