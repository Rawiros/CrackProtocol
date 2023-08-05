// This packet was 35

export default class EntityMoveLook {
    name = "entity_move_look";
    normalized_name = "EntityMoveLook";
    data = {"entityId":3545,"dX":319,"dY":0,"dZ":-816,"yaw":-109,"pitch":0,"onGround":true};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setDx(value: (typeof this.data)['dX']) { this.data['dX'] = value; return this };
    setDy(value: (typeof this.data)['dY']) { this.data['dY'] = value; return this };
    setDz(value: (typeof this.data)['dZ']) { this.data['dZ'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setOnground(value: (typeof this.data)['onGround']) { this.data['onGround'] = value; return this };
};