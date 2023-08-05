// This packet was 37

export default class Advancements {
    name = "advancements";
    normalized_name = "Advancements";
    data = {"reset":true,"advancementMapping":[],"identifiers":[],"progressMapping":[]};
    cancelled?: boolean;
    
    setReset(value: (typeof this.data)['reset']) { this.data['reset'] = value; return this };
    setAdvancementmapping(value: (typeof this.data)['advancementMapping']) { this.data['advancementMapping'] = value; return this };
    setIdentifiers(value: (typeof this.data)['identifiers']) { this.data['identifiers'] = value; return this };
    setProgressmapping(value: (typeof this.data)['progressMapping']) { this.data['progressMapping'] = value; return this };
};