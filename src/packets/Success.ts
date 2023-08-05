// This packet was 2

export default class Success {
    name = "success";
    normalized_name = "Success";
    data = {"uuid":"e90be84d-5868-3a98-b491-e5f72a5ec1d1","username":"adam_kasztan","properties":[]};
    cancelled?: boolean;
    
    setUuid(value: (typeof this.data)['uuid']) { this.data['uuid'] = value; return this };
    setUsername(value: (typeof this.data)['username']) { this.data['username'] = value; return this };
    setProperties(value: (typeof this.data)['properties']) { this.data['properties'] = value; return this };
};