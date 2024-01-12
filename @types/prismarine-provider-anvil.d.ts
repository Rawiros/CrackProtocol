import { PCChunk } from 'prismarine-chunk';

export type nbtChunkToPrismarineChunk<K extends keyof ChunkVersions> = ChunkVersions[K]['nbtChunkToPrismarineChunk'];
export type prismarineChunkToNbt<K extends keyof ChunkVersions> = ChunkVersions[K]['prismarineChunkToNbt'];

declare module 'prismarine-provider-anvil' {
	export const Anvil: (mcVersion: string) => {
		new(path: string): {
			regions: Record<string, any>;
			path: string;
			regionFileName(x: number, z: number): string;
			getRegion(x: number, z: number): Promise<RegionFile>;
			load(x: number, z: number): Promise<nbtChunkToPrismarineChunk>;
			loadRaw(x: number, z: number): Promise<ReturnType<RegionFile['read']>>;
			save(x: number, z: number, chunk: any): Promise<void>;
			saveRaw(x: number, z: number, nbt: ReturnType<RegionFile['read']>): Promise<void>;
			getAllChunksInRegion(x: number, z: number): Promise<PCChunk[]>;
			close(): Promise<string[]>;
		};
	};

	export interface IAnvil {
		regions: Record<string, any>;
		path: string;
		regionFileName(x: number, z: number): string;
		getRegion(x: number, z: number): Promise<RegionFile>;
		load(x: number, z: number): Promise<nbtChunkToPrismarineChunk>;
		loadRaw(x: number, z: number): Promise<ReturnType<RegionFile['read']>>;
		save(x: number, z: number, chunk: any): Promise<void>;
		saveRaw(x: number, z: number, nbt: ReturnType<RegionFile['read']>): Promise<void>;
		getAllChunksInRegion(x: number, z: number): Promise<PCChunk[]>;
		close(): Promise<string[]>;
	}

	export let chunk: <T extends keyof ChunkVersions>(registryOrVersion: T) => ChunkVersions[T];

	export let level: {
		readLevel(path: any): Promise<any>;
		writeLevel(path: any, value: any): Promise<void>;
	};
}

export interface RegionFile {
	static outOfBounds(x: any, z: any): boolean;
	constructor(path: string);
	fileName: any;
	lastModified: number;
	q: Promise<void>;
	initialize(): Promise<void>;
	ini: Promise<void>;
	_initialize(): Promise<void>;
	offsets: any[];
	chunkTimestamps: any[];
	sizeDelta: number;
	file: fs.FileHandle;
	sectorFree: any[];
	getSizeDelta(): number;
	read(x: any, z: any): Promise<nbt.NBT>;
	write(x: any, z: any, nbtData: any): Promise<void>;
	_write(x: any, z: any, nbtData: any): Promise<void>;
	writeChunk(sectorNumber: any, data: any, length: any): Promise<void>;
	getOffset(x: any, z: any): any;
	hasChunk(x: any, z: any): boolean;
	setOffset(x: any, z: any, offset: any): Promise<void>;
	setTimestamp(x: any, z: any, value: any): Promise<void>;
	close(): Promise<void>;
} namespace RegionFile {
	let VERSION_GZIP: number;
	let VERSION_DEFLATE: number;
	let SECTOR_BYTES: number;
	let SECTOR_INTS: number;
	let CHUNK_HEADER_SIZE: number;
	let debug: {
		(...data: any[]): void;
		(message?: any, ...optionalParams: any[]): void;
	};
}

export interface ChunkVersions {
	'1.8': {
		nbtChunkToPrismarineChunk: (data: any) => PCChunk;
		prismarineChunkToNbt: (chunk: any, chunkXPos: any, chunkZPos: any) => {
			name: string;
			type: string;
			value: {
				Level: {
					type: string;
					value: {
						Biomes: {
							value: any[];
							type: string;
						};
						Sections: {
							type: string;
							value: {
								type: string;
								value: {
									Y: {
										type: string;
										value: any;
									};
									Blocks: {
										type: string;
										value: any[];
									};
									Data: {
										type: string;
										value: any[];
									};
									BlockLight: {
										type: string;
										value: any[];
									};
									SkyLight: {
										type: string;
										value: any[];
									};
								}[];
							};
						};
						xPos: {
							type: string;
							value: any;
						};
						zPos: {
							type: string;
							value: any;
						};
					};
				};
			};
		};
	}
	'1.13': {
		nbtChunkToPrismarineChunk: (data: any) => PCChunk;
		prismarineChunkToNbt: (chunk: any, chunkXPos: any, chunkZPos: any) => {
			name: string;
			type: string;
			value: {
				Level: {
					type: string;
					value: {
						Biomes: {
							value: any;
							type: string;
						};
						Sections: {
							type: string;
							value: {
								type: string;
								value: {
									Y: {
										type: string;
										value: any;
									};
									Palette: {
										type: string;
										value: {
											type: string;
											value: {
												Name: {
													type: string;
													value: string;
												};
											}[];
										};
									};
									BlockStates: {
										type: string;
										value: any[];
									};
									BlockLight: {
										type: string;
										value: number[];
									};
									SkyLight: {
										type: string;
										value: number[];
									};
								}[];
							};
						};
						xPos: {
							type: string;
							value: any;
						};
						zPos: {
							type: string;
							value: any;
						};
						Status: {
							type: string;
							value: string;
						};
					};
				};
				DataVersion: {
					type: string;
					value: number;
				};
			}
		}
	};
	'1.14': {
		nbtChunkToPrismarineChunk: (data: any) => PCChunk;
		prismarineChunkToNbt: (chunk: any, chunkXPos: any, chunkZPos: any) => {
			name: string;
			type: string;
			value: {
				Level: {
					type: string;
					value: {
						Biomes: {
							value: any;
							type: string;
						};
						Sections: {
							type: string;
							value: {
								type: string;
								value: {
									Y: {
										type: string;
										value: any;
									};
									Palette: {
										type: string;
										value: {
											type: string;
											value: {
												Name: {
													type: string;
													value: string;
												};
											}[];
										};
									};
									BlockStates: {
										type: string;
										value: any[];
									};
								}[];
							};
						};
						isLightOn: {
							type: string;
							value: number;
						};
						Status: {
							type: string;
							value: string;
						};
						shouldSave: {
							type: string;
							value: number;
						};
						xPos: {
							type: string;
							value: any;
						};
						zPos: {
							type: string;
							value: any;
						};
					};
				};
				DataVersion: {
					type: string;
					value: any;
				};
			};
		};
	};
	'1.18': {
		nbtChunkToPrismarineChunk: (tag: any) => any;
		prismarineChunkToNbt: (column: any, x: any, z: any) => {
			type: nbt.TagType.Compound;
			name?: string;
			value: {
				DataVersion: {
					type: nbt.TagType.Int;
					value: any;
				};
				Status: {
					type: nbt.TagType.String;
					value: "full";
				};
				xPos: {
					type: nbt.TagType.Int;
					value: any;
				};
				yPos: {
					type: nbt.TagType.Int;
					value: number;
				};
				zPos: {
					type: nbt.TagType.Int;
					value: any;
				};
				block_entities: {
					type: nbt.TagType.List;
					value: {
						type: string;
						value: {
							type: nbt.TagType.Compound;
							name?: string;
							value: any[];
						};
					};
				};
				LastUpdate: {
					type: nbt.TagType.Long;
					value: any;
				};
				InhabitedTime: {
					type: nbt.TagType.Long;
					value: any;
				};
				structures: {
					type: nbt.TagType.Compound;
					name?: string;
					value: {};
				};
				Heightmaps: {
					type: nbt.TagType.Compound;
					name?: string;
					value: {};
				};
				sections: {
					type: nbt.TagType.List;
					value: {
						type: string;
						value: {
							type: nbt.TagType.Compound;
							name?: string;
							value: {
								Y: {
									type: nbt.TagType.Byte;
									value: number;
								};
								block_states: {
									type: nbt.TagType.Compound;
									name?: string;
									value: {
										palette: {
											type: nbt.TagType.List;
											value: {
												type: string;
												value: {
													type: nbt.TagType.Compound;
													name?: string;
													value: any;
												};
											};
										};
									};
								};
								biomes: {
									type: nbt.TagType.Compound;
									name?: string;
									value: {
										palette: {
											type: nbt.TagType.List;
											value: {
												type: string;
												value: {
													type: nbt.TagType.String;
													value: any;
												};
											};
										};
									};
								};
							}[];
						};
					};
				};
				isLightOn: {
					type: nbt.TagType.Short;
					value: number;
				};
				block_ticks: {
					type: nbt.TagType.List;
					value: {
						type: string;
						value: {
							type: string;
						};
					};
				};
				PostProcessing: {
					type: nbt.TagType.List;
					value: {
						type: string;
						value: {
							type: string;
						};
					};
				};
				fluid_ticks: {
					type: nbt.TagType.List;
					value: {
						type: string;
						value: {
							type: string;
						};
					};
				};
			};
		};
	};
}