// This packet was 44

export default class UnloadChunk {
    name = "unload_chunk";
    normalized_name = "UnloadChunk";
    data = {"chunkX":-1,"chunkZ":-7};
    cancelled?: boolean;
    
    setChunkx(value: (typeof this.data)['chunkX']) { this.data['chunkX'] = value; return this };
    setChunkz(value: (typeof this.data)['chunkZ']) { this.data['chunkZ'] = value; return this };
};