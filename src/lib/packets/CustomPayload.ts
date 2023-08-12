// This packet was 4

export default class CustomPayload {
    name = "custom_payload";
    normalized_name = "CustomPayload";
    data = {"channel":"minecraft:register","data":{"type":"Buffer","data":[112,117,114,112,117,114,58,98,101,101,104,105,118,101,95,99,50,115,0]}};
    cancelled?: boolean;
    
    setChannel(value: (typeof this.data)['channel']) { this.data['channel'] = value; return this };
    setData(value: (typeof this.data)['data']) { this.data['data'] = value; return this };
};