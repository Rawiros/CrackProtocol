// This packet was 23

export default class EntityEquipment {
    name = "entity_equipment";
    normalized_name = "EntityEquipment";
    data = {"entityId":3496,"equipments":[{"slot":0,"item":{"present":true,"itemId":735,"itemCount":1,"nbtData":{"type":"compound","name":"","value":{"Damage":{"type":"int","value":0}}}}}]};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setEquipments(value: (typeof this.data)['equipments']) { this.data['equipments'] = value; return this };
};