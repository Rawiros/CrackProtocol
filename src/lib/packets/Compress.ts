// This packet was 1

export default class Compress {
    name = "compress";
    normalized_name = "Compress";
    data = {"threshold":256};
    cancelled?: boolean;
    
    setThreshold(value: (typeof this.data)['threshold']) { this.data['threshold'] = value; return this };
};