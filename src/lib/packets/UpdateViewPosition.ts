// This packet was 19

export default class UpdateViewPosition {
    name = "update_view_position";
    normalized_name = "UpdateViewPosition";
    data = {"chunkX":3,"chunkZ":-1};
    cancelled?: boolean;
    
    setChunkx(value: (typeof this.data)['chunkX']) { this.data['chunkX'] = value; return this };
    setChunkz(value: (typeof this.data)['chunkZ']) { this.data['chunkZ'] = value; return this };
};