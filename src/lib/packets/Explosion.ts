// This packet was 53

export default class Explosion {
    name = "explosion";
    normalized_name = "Explosion";
    data = {"x":56.65475765723119,"y":84,"z":6.183403892454944,"radius":6,"affectedBlockOffsets":[{"x":1,"y":0,"z":1},{"x":-1,"y":-1,"z":1},{"x":1,"y":-1,"z":2},{"x":5,"y":-6,"z":-5},{"x":1,"y":-1,"z":-3},{"x":-1,"y":-1,"z":-2},{"x":1,"y":-1,"z":-2},{"x":3,"y":-1,"z":0},{"x":2,"y":-1,"z":1},{"x":1,"y":-1,"z":-1},{"x":-1,"y":0,"z":0},{"x":4,"y":-7,"z":-2},{"x":5,"y":-4,"z":2},{"x":-1,"y":-1,"z":0},{"x":3,"y":-1,"z":-1},{"x":2,"y":-1,"z":-3},{"x":4,"y":-6,"z":2},{"x":2,"y":-1,"z":0},{"x":0,"y":-1,"z":-1},{"x":1,"y":0,"z":-1},{"x":0,"y":-1,"z":4},{"x":3,"y":-6,"z":2},{"x":3,"y":-1,"z":1},{"x":4,"y":-4,"z":3},{"x":4,"y":-6,"z":-4},{"x":4,"y":-3,"z":3},{"x":0,"y":-1,"z":0},{"x":1,"y":-1,"z":0},{"x":3,"y":-1,"z":-3},{"x":0,"y":-1,"z":3},{"x":-1,"y":-1,"z":4},{"x":1,"y":-1,"z":3},{"x":3,"y":-1,"z":-2},{"x":-5,"y":-6,"z":3},{"x":3,"y":-9,"z":0},{"x":5,"y":-6,"z":-3},{"x":-1,"y":-1,"z":2},{"x":0,"y":0,"z":-1},{"x":0,"y":-1,"z":-3},{"x":1,"y":-1,"z":1},{"x":0,"y":-1,"z":-2},{"x":3,"y":-7,"z":-2},{"x":2,"y":-1,"z":3},{"x":-1,"y":-1,"z":-1},{"x":0,"y":-1,"z":1},{"x":1,"y":-1,"z":4},{"x":2,"y":-1,"z":-2},{"x":0,"y":0,"z":4},{"x":5,"y":-5,"z":3},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":2},{"x":-1,"y":0,"z":2},{"x":3,"y":-6,"z":1},{"x":2,"y":-6,"z":2},{"x":-1,"y":-1,"z":-3},{"x":-1,"y":-1,"z":3},{"x":1,"y":-9,"z":1},{"x":-1,"y":0,"z":-1},{"x":0,"y":-1,"z":2},{"x":2,"y":-1,"z":2},{"x":-1,"y":0,"z":4},{"x":2,"y":-1,"z":-1},{"x":-1,"y":0,"z":3},{"x":5,"y":-3,"z":2},{"x":-1,"y":0,"z":1}],"playerMotionX":0,"playerMotionY":0,"playerMotionZ":0};
    cancelled?: boolean;
    
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setRadius(value: (typeof this.data)['radius']) { this.data['radius'] = value; return this };
    setAffectedblockoffsets(value: (typeof this.data)['affectedBlockOffsets']) { this.data['affectedBlockOffsets'] = value; return this };
    setPlayermotionx(value: (typeof this.data)['playerMotionX']) { this.data['playerMotionX'] = value; return this };
    setPlayermotiony(value: (typeof this.data)['playerMotionY']) { this.data['playerMotionY'] = value; return this };
    setPlayermotionz(value: (typeof this.data)['playerMotionZ']) { this.data['playerMotionZ'] = value; return this };
};