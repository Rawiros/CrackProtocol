// This packet was 40

export default class RelEntityMove {
    name = "rel_entity_move";
    normalized_name = "RelEntityMove";
    data = {"entityId":3544,"dX":13,"dY":0,"dZ":0,"onGround":false};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setDx(value: (typeof this.data)['dX']) { this.data['dX'] = value; return this };
    setDy(value: (typeof this.data)['dY']) { this.data['dY'] = value; return this };
    setDz(value: (typeof this.data)['dZ']) { this.data['dZ'] = value; return this };
    setOnground(value: (typeof this.data)['onGround']) { this.data['onGround'] = value; return this };
};