// This packet was 28

export default class UpdateTime {
    name = "update_time";
    normalized_name = "UpdateTime";
    data = {"age":[0,35928],"time":[-1,-1143]};
    cancelled?: boolean;
    
    setAge(value: (typeof this.data)['age']) { this.data['age'] = value; return this };
    setTime(value: (typeof this.data)['time']) { this.data['time'] = value; return this };
};