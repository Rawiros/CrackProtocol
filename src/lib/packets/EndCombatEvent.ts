// This packet was 54

export default class EndCombatEvent {
    name = "end_combat_event";
    normalized_name = "EndCombatEvent";
    data = {"duration":373,"entityId":44};
    cancelled?: boolean;
    
    setDuration(value: (typeof this.data)['duration']) { this.data['duration'] = value; return this };
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
};