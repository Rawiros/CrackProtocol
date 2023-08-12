// This packet was 30

export default class WindowItems {
    name = "window_items";
    normalized_name = "WindowItems";
    data = {"windowId":0,"stateId":1,"items":[{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false},{"present":false}],"carriedItem":{"present":false}};
    cancelled?: boolean;
    
    setWindowid(value: (typeof this.data)['windowId']) { this.data['windowId'] = value; return this };
    setStateid(value: (typeof this.data)['stateId']) { this.data['stateId'] = value; return this };
    setItems(value: (typeof this.data)['items']) { this.data['items'] = value; return this };
    setCarrieditem(value: (typeof this.data)['carriedItem']) { this.data['carriedItem'] = value; return this };
};