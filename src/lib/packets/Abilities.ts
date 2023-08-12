// This packet was 7

export default class Abilities {
    name = "abilities";
    normalized_name = "Abilities";
    data = {"flags":13,"flyingSpeed":0.05000000074505806,"walkingSpeed":0.10000000149011612};
    cancelled?: boolean;
    
    setFlags(value: (typeof this.data)['flags']) { this.data['flags'] = value; return this };
    setFlyingspeed(value: (typeof this.data)['flyingSpeed']) { this.data['flyingSpeed'] = value; return this };
    setWalkingspeed(value: (typeof this.data)['walkingSpeed']) { this.data['walkingSpeed'] = value; return this };
};