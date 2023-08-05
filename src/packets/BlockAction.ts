// This packet was 49

export default class BlockAction {
    name = "block_action";
    normalized_name = "BlockAction";
    data = {"location":{"x":61,"z":9,"y":84},"byte1":1,"byte2":1,"blockId":167};
    cancelled?: boolean;
    
    setLocation(value: (typeof this.data)['location']) { this.data['location'] = value; return this };
    setByte1(value: (typeof this.data)['byte1']) { this.data['byte1'] = value; return this };
    setByte2(value: (typeof this.data)['byte2']) { this.data['byte2'] = value; return this };
    setBlockid(value: (typeof this.data)['blockId']) { this.data['blockId'] = value; return this };
};