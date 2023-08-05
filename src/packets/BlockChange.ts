// This packet was 42

export default class BlockChange {
    name = "block_change";
    normalized_name = "BlockChange";
    data = {"location":{"x":91,"z":-84,"y":-18},"type":20448};
    cancelled?: boolean;
    
    setLocation(value: (typeof this.data)['location']) { this.data['location'] = value; return this };
    setType(value: (typeof this.data)['type']) { this.data['type'] = value; return this };
};