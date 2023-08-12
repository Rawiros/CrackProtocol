// This packet was 48

export default class MultiBlockChange {
    name = "multi_block_change";
    normalized_name = "MultiBlockChange";
    data = {"chunkCoordinates":{"x":3,"z":0,"y":5},"suppressLightUpdates":false,"records":[47451797,47484564]};
    cancelled?: boolean;
    
    setChunkcoordinates(value: (typeof this.data)['chunkCoordinates']) { this.data['chunkCoordinates'] = value; return this };
    setSuppresslightupdates(value: (typeof this.data)['suppressLightUpdates']) { this.data['suppressLightUpdates'] = value; return this };
    setRecords(value: (typeof this.data)['records']) { this.data['records'] = value; return this };
};