// This packet was 38

export default class UpdateHealth {
    name = "update_health";
    normalized_name = "UpdateHealth";
    data = {"health":20,"food":20,"foodSaturation":5};
    cancelled?: boolean;
    
    setHealth(value: (typeof this.data)['health']) { this.data['health'] = value; return this };
    setFood(value: (typeof this.data)['food']) { this.data['food'] = value; return this };
    setFoodsaturation(value: (typeof this.data)['foodSaturation']) { this.data['foodSaturation'] = value; return this };
};