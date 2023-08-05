// This packet was 22

export default class EntityUpdateAttributes {
    name = "entity_update_attributes";
    normalized_name = "EntityUpdateAttributes";
    data = {"entityId":3496,"properties":[{"key":"minecraft:generic.movement_speed","value":0.25,"modifiers":[]},{"key":"minecraft:generic.max_health","value":20,"modifiers":[]}]};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setProperties(value: (typeof this.data)['properties']) { this.data['properties'] = value; return this };
};