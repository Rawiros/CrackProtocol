// This packet was 56

export default class Collect {
    name = "collect";
    normalized_name = "Collect";
    data = {"collectedEntityId":3638,"collectorEntityId":44,"pickupItemCount":1};
    cancelled?: boolean;
    
    setCollectedentityid(value: (typeof this.data)['collectedEntityId']) { this.data['collectedEntityId'] = value; return this };
    setCollectorentityid(value: (typeof this.data)['collectorEntityId']) { this.data['collectorEntityId'] = value; return this };
    setPickupitemcount(value: (typeof this.data)['pickupItemCount']) { this.data['pickupItemCount'] = value; return this };
};