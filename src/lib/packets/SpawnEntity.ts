// This packet was 20

export default class SpawnEntity {
    name = "spawn_entity";
    normalized_name = "SpawnEntity";
    data = {"entityId":3496,"objectUUID":"aa84fca2-7044-4df7-a770-2d3efb46a0b9","type":82,"x":34.683034589833504,"y":-35,"z":-7.712401798243511,"pitch":0,"yaw":-99,"headPitch":-70,"objectData":0,"velocityX":0,"velocityY":-627,"velocityZ":0};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setObjectuuid(value: (typeof this.data)['objectUUID']) { this.data['objectUUID'] = value; return this };
    setType(value: (typeof this.data)['type']) { this.data['type'] = value; return this };
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setHeadpitch(value: (typeof this.data)['headPitch']) { this.data['headPitch'] = value; return this };
    setObjectdata(value: (typeof this.data)['objectData']) { this.data['objectData'] = value; return this };
    setVelocityx(value: (typeof this.data)['velocityX']) { this.data['velocityX'] = value; return this };
    setVelocityy(value: (typeof this.data)['velocityY']) { this.data['velocityY'] = value; return this };
    setVelocityz(value: (typeof this.data)['velocityZ']) { this.data['velocityZ'] = value; return this };
};