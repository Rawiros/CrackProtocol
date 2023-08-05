// This packet was 5

export default class FeatureFlags {
    name = "feature_flags";
    normalized_name = "FeatureFlags";
    data = {"features":["minecraft:vanilla"]};
    cancelled?: boolean;
    
    setFeatures(value: (typeof this.data)['features']) { this.data['features'] = value; return this };
};