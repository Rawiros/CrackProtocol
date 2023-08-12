// This packet was 29

export default class SpawnPosition {
    name = "spawn_position";
    normalized_name = "SpawnPosition";
    data = {"location":{"x":61,"z":7,"y":84},"angle":0};
    cancelled?: boolean;
    
    setLocation(value: (typeof this.data)['location']) { this.data['location'] = value; return this };
    setAngle(value: (typeof this.data)['angle']) { this.data['angle'] = value; return this };
};