// This packet was 15

export default class SystemChat {
    name = "system_chat";
    normalized_name = "SystemChat";
    data = {"content":"{\"color\":\"yellow\",\"translate\":\"multiplayer.player.joined\",\"with\":[{\"insertion\":\"adam_kasztan\",\"clickEvent\":{\"action\":\"suggest_command\",\"value\":\"/tell adam_kasztan \"},\"hoverEvent\":{\"action\":\"show_entity\",\"contents\":{\"type\":\"minecraft:player\",\"id\":\"e90be84d-5868-3a98-b491-e5f72a5ec1d1\",\"name\":{\"text\":\"adam_kasztan\"}}},\"text\":\"adam_kasztan\"}]}","isActionBar":false};
    cancelled?: boolean;
    
    setContent(value: (typeof this.data)['content']) { this.data['content'] = value; return this };
    setIsactionbar(value: (typeof this.data)['isActionBar']) { this.data['isActionBar'] = value; return this };
};