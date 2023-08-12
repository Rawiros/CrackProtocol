// This packet was 45

export default class EntityLook {
    name = "entity_look";
    normalized_name = "EntityLook";
    data = {"entityId":44,"yaw":58,"pitch":27,"onGround":true};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setOnground(value: (typeof this.data)['onGround']) { this.data['onGround'] = value; return this };
};