// This packet was 52

export default class WorldParticles {
    name = "world_particles";
    normalized_name = "WorldParticles";
    data = {"particleId":2,"longDistance":false,"x":59.5,"y":85.31666668256123,"z":4.5,"offsetX":0.125,"offsetY":0.4937500059604645,"offsetZ":0.125,"particleData":0.05000000074505806,"particles":10,"data":{"blockState":15}};
    cancelled?: boolean;
    
    setParticleid(value: (typeof this.data)['particleId']) { this.data['particleId'] = value; return this };
    setLongdistance(value: (typeof this.data)['longDistance']) { this.data['longDistance'] = value; return this };
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setOffsetx(value: (typeof this.data)['offsetX']) { this.data['offsetX'] = value; return this };
    setOffsety(value: (typeof this.data)['offsetY']) { this.data['offsetY'] = value; return this };
    setOffsetz(value: (typeof this.data)['offsetZ']) { this.data['offsetZ'] = value; return this };
    setParticledata(value: (typeof this.data)['particleData']) { this.data['particleData'] = value; return this };
    setParticles(value: (typeof this.data)['particles']) { this.data['particles'] = value; return this };
    setData(value: (typeof this.data)['data']) { this.data['data'] = value; return this };
};