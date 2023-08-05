// This packet was 24

export default class EntityHeadRotation {
    name = "entity_head_rotation";
    normalized_name = "EntityHeadRotation";
    data = {"entityId":3496,"headYaw":-70};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setHeadyaw(value: (typeof this.data)['headYaw']) { this.data['headYaw'] = value; return this };
};