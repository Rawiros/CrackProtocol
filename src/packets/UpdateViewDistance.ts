// This packet was 17

export default class UpdateViewDistance {
    name = "update_view_distance";
    normalized_name = "UpdateViewDistance";
    data = {"viewDistance":6};
    cancelled?: boolean;
    
    setViewdistance(value: (typeof this.data)['viewDistance']) { this.data['viewDistance'] = value; return this };
};