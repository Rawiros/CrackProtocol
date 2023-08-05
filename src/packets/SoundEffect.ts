// This packet was 41

export default class SoundEffect {
    name = "sound_effect";
    normalized_name = "SoundEffect";
    data = {"soundId":2,"soundCategory":6,"x":453,"y":644,"z":13,"volume":0.4000000059604645,"pitch":0.9919036030769348,"seed":[201325049,1465373584]};
    cancelled?: boolean;
    
    setSoundid(value: (typeof this.data)['soundId']) { this.data['soundId'] = value; return this };
    setSoundcategory(value: (typeof this.data)['soundCategory']) { this.data['soundCategory'] = value; return this };
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setVolume(value: (typeof this.data)['volume']) { this.data['volume'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setSeed(value: (typeof this.data)['seed']) { this.data['seed'] = value; return this };
};