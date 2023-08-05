// This packet was 21

export default class EntityMetadata {
    name = "entity_metadata";
    normalized_name = "EntityMetadata";
    data = {"entityId":3496,"metadata":[{"key":9,"type":3,"value":20}]};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setMetadata(value: (typeof this.data)['metadata']) { this.data['metadata'] = value; return this };
};