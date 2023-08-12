// This packet was 8

export default class HeldItemSlot {
    name = "held_item_slot";
    normalized_name = "HeldItemSlot";
    data = {"slot":0};
    cancelled?: boolean;
    
    setSlot(value: (typeof this.data)['slot']) { this.data['slot'] = value; return this };
};