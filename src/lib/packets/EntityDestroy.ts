// This packet was 43

export default class EntityDestroy {
    name = "entity_destroy";
    normalized_name = "EntityDestroy";
    data = {"entityIds":[3456]};
    cancelled?: boolean;
    
    setEntityids(value: (typeof this.data)['entityIds']) { this.data['entityIds'] = value; return this };
};