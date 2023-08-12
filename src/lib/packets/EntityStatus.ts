// This packet was 11

export default class EntityStatus {
    name = "entity_status";
    normalized_name = "EntityStatus";
    data = {"entityId":3570,"entityStatus":24};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setEntitystatus(value: (typeof this.data)['entityStatus']) { this.data['entityStatus'] = value; return this };
};