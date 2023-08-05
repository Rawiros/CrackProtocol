// This packet was 57

export default class TileEntityData {
    name = "tile_entity_data";
    normalized_name = "TileEntityData";
    data = {"location":{"x":62,"z":10,"y":84},"action":9,"nbtData":{"type":"compound","name":"","value":{"MaxNearbyEntities":{"type":"short","value":6},"MinSpawnDelay":{"type":"short","value":200},"SpawnRange":{"type":"short","value":4},"MaxSpawnDelay":{"type":"short","value":800},"RequiredPlayerRange":{"type":"short","value":16},"SpawnCount":{"type":"short","value":4},"Delay":{"type":"short","value":20}}}};
    cancelled?: boolean;
    
    setLocation(value: (typeof this.data)['location']) { this.data['location'] = value; return this };
    setAction(value: (typeof this.data)['action']) { this.data['action'] = value; return this };
    setNbtdata(value: (typeof this.data)['nbtData']) { this.data['nbtData'] = value; return this };
};