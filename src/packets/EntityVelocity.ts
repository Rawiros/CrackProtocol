// This packet was 25

export default class EntityVelocity {
    name = "entity_velocity";
    normalized_name = "EntityVelocity";
    data = {"entityId":70,"velocityX":0,"velocityY":0,"velocityZ":0};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setVelocityx(value: (typeof this.data)['velocityX']) { this.data['velocityX'] = value; return this };
    setVelocityy(value: (typeof this.data)['velocityY']) { this.data['velocityY'] = value; return this };
    setVelocityz(value: (typeof this.data)['velocityZ']) { this.data['velocityZ'] = value; return this };
};