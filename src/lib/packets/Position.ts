// This packet was 13

export default class Position {
    name = "position";
    normalized_name = "Position";
    data = {"x":61.5,"y":73,"z":-1.5,"yaw":0,"pitch":0,"flags":0,"teleportId":1,"dismountVehicle":false};
    cancelled?: boolean;
    
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setY(value: (typeof this.data)['y']) { this.data['y'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setYaw(value: (typeof this.data)['yaw']) { this.data['yaw'] = value; return this };
    setPitch(value: (typeof this.data)['pitch']) { this.data['pitch'] = value; return this };
    setFlags(value: (typeof this.data)['flags']) { this.data['flags'] = value; return this };
    setTeleportid(value: (typeof this.data)['teleportId']) { this.data['teleportId'] = value; return this };
    setDismountvehicle(value: (typeof this.data)['dismountVehicle']) { this.data['dismountVehicle'] = value; return this };
};