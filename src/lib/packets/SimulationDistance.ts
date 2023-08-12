// This packet was 18

export default class SimulationDistance {
    name = "simulation_distance";
    normalized_name = "SimulationDistance";
    data = {"distance":5};
    cancelled?: boolean;
    
    setDistance(value: (typeof this.data)['distance']) { this.data['distance'] = value; return this };
};