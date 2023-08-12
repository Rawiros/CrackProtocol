// This packet was 59

export default class KickDisconnect {
    name = "kick_disconnect";
    normalized_name = "KickDisconnect";
    data = {"reason":"{\"translate\":\"multiplayer.disconnect.kicked\"}"};
    cancelled?: boolean;
    
    setReason(value: (typeof this.data)['reason']) { this.data['reason'] = value; return this };
};