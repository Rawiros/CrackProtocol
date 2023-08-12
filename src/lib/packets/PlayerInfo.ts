// This packet was 16

export default class PlayerInfo {
    name = "player_info";
    normalized_name = "PlayerInfo";
    data = {"action":63,"data":[{"uuid":"e90be84d-5868-3a98-b491-e5f72a5ec1d1","player":{"name":"adam_kasztan","properties":[]},"gamemode":1,"listed":true,"latency":0}]};
    cancelled?: boolean;
    
    setAction(value: (typeof this.data)['action']) { this.data['action'] = value; return this };
    setData(value: (typeof this.data)['data']) { this.data['data'] = value; return this };
};