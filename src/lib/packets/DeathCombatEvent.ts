// This packet was 58

export default class DeathCombatEvent {
    name = "death_combat_event";
    normalized_name = "DeathCombatEvent";
    data = {"playerId":3570,"entityId":44,"message":"{\"translate\":\"death.attack.player\",\"with\":[{\"insertion\":\"adam_kasztan\",\"clickEvent\":{\"action\":\"suggest_command\",\"value\":\"/tell adam_kasztan \"},\"hoverEvent\":{\"action\":\"show_entity\",\"contents\":{\"type\":\"minecraft:player\",\"id\":\"e90be84d-5868-3a98-b491-e5f72a5ec1d1\",\"name\":{\"text\":\"adam_kasztan\"}}},\"text\":\"adam_kasztan\"},{\"insertion\":\"dziewiatka\",\"clickEvent\":{\"action\":\"suggest_command\",\"value\":\"/tell dziewiatka \"},\"hoverEvent\":{\"action\":\"show_entity\",\"contents\":{\"type\":\"minecraft:player\",\"id\":\"c709b5f7-d5f8-386f-9244-a7eb82fddc27\",\"name\":{\"text\":\"dziewiatka\"}}},\"text\":\"dziewiatka\"}]}"};
    cancelled?: boolean;
    
    setPlayerid(value: (typeof this.data)['playerId']) { this.data['playerId'] = value; return this };
    setEntityid(value: (typeof this.data)['entityId']) { this.data['entityId'] = value; return this };
    setMessage(value: (typeof this.data)['message']) { this.data['message'] = value; return this };
};