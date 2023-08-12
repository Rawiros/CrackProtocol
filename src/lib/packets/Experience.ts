// This packet was 39

export default class Experience {
    name = "experience";
    normalized_name = "Experience";
    data = {"experienceBar":0,"totalExperience":0,"level":0};
    cancelled?: boolean;
    
    setExperiencebar(value: (typeof this.data)['experienceBar']) { this.data['experienceBar'] = value; return this };
    setTotalexperience(value: (typeof this.data)['totalExperience']) { this.data['totalExperience'] = value; return this };
    setLevel(value: (typeof this.data)['level']) { this.data['level'] = value; return this };
};