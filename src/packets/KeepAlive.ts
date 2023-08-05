// This packet was 47

export default class KeepAlive {
    name = "keep_alive";
    normalized_name = "KeepAlive";
    data = {"keepAliveId":[6,1006603558]};
    cancelled?: boolean;
    
    setKeepaliveid(value: (typeof this.data)['keepAliveId']) { this.data['keepAliveId'] = value; return this };
};