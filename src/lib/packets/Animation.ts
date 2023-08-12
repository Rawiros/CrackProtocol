// This packet was 46

export default class Animation {
    name = "animation";
    normalized_name = "Animation";
    data = {"entityId":44,"animation":0};
    cancelled?: boolean;
    
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setAnimation(value: (typeof this.data)['animation']) { this.data['animation'] = value; return this };
};