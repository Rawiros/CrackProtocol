// This packet was 6

export default class Difficulty {
    name = "difficulty";
    normalized_name = "Difficulty";
    data = {"difficulty":1,"difficultyLocked":false};
    cancelled?: boolean;
    
    setDifficulty(value: (typeof this.data)['difficulty']) { this.data['difficulty'] = value; return this };
    setDifficultylocked(value: (typeof this.data)['difficultyLocked']) { this.data['difficultyLocked'] = value; return this };
};