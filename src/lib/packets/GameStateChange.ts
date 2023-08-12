// This packet was 50

export default class GameStateChange {
    name = "game_state_change";
    normalized_name = "GameStateChange";
    data = {"reason":3,"gameMode":0};
    cancelled?: boolean;
    
    setReason(value: (typeof this.data)['reason']) { this.data['reason'] = value; return this };
    setGamemode(value: (typeof this.data)['gameMode']) { this.data['gameMode'] = value; return this };
};