// This packet was 26

export default class NamedEntitySpawn {
    name = "named_entity_spawn";
    normalized_name = "NamedEntitySpawn";
    data = {"entityId":44,"playerUUID":"c709b5f7-d5f8-386f-9244-a7eb82fddc27","x":61.877152370018194,"y":84,"z":6.64102916670674,"yaw":55,"pitch":25};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setPlayeruuid(value: (typeof this.data)['playerUUID']) { this.data['playerUUID'] = value; return this };
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
};