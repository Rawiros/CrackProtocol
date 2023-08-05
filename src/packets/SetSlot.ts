// This packet was 31

export default class SetSlot {
    name = "set_slot";
    normalized_name = "SetSlot";
    data = {"windowId":0,"stateId":2,"slot":45,"item":{"present":false}};
    cancelled?: boolean;
    
    setWindowid(value: (typeof this.data)['windowId']) { this.data['windowId'] = value; return this };
    setStateid(value: (typeof this.data)['stateId']) { this.data['stateId'] = value; return this };
    setSlot(value: (typeof this.data)['slot']) { this.data['slot'] = value; return this };
    setItem(value: (typeof this.data)['item']) { this.data['item'] = value; return this };
};