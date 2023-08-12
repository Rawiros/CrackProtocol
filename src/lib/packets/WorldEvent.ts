// This packet was 55

export default class WorldEvent {
    name = "world_event";
    normalized_name = "WorldEvent";
    data = {"effectId":2001,"location":{"x":62,"z":9,"y":85},"data":11584,"global":false};
    cancelled?: boolean;
    
    setEffectid(value: (typeof this.data)['effectId']) { this.data['effectId'] = value; return this };
    setLocation(value: (typeof this.data)['location']) { this.data['location'] = value; return this };
    setData(value: (typeof this.data)['data']) { this.data['data'] = value; return this };
    setGlobal(value: (typeof this.data)['global']) { this.data['global'] = value; return this };
};