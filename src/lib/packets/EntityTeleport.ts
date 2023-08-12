// This packet was 36

export default class EntityTeleport {
    name = "entity_teleport";
    normalized_name = "EntityTeleport";
    data = {"entityId":3567,"x":34.48689189645659,"y":5.535840625044555,"z":-31.376610821293532,"yaw":66,"pitch":0,"onGround":false};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setOnground(value: (typeof this.data)['onGround']) { this.data['onGround'] = value; return this };
};