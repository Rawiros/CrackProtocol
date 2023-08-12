// This packet was 27

export default class InitializeWorldBorder {
    name = "initialize_world_border";
    normalized_name = "InitializeWorldBorder";
    data = {"x":0,"z":0,"oldDiameter":59999968,"newDiameter":59999968,"speed":0,"portalTeleportBoundary":29999984,"warningBlocks":5,"warningTime":15};
    cancelled?: boolean;
    
    setX(value: (typeof this.data)['x']) { this.data['x'] = value; return this };
    setZ(value: (typeof this.data)['z']) { this.data['z'] = value; return this };
    setOlddiameter(value: (typeof this.data)['oldDiameter']) { this.data['oldDiameter'] = value; return this };
    setNewdiameter(value: (typeof this.data)['newDiameter']) { this.data['newDiameter'] = value; return this };
    setSpeed(value: (typeof this.data)['speed']) { this.data['speed'] = value; return this };
    setPortalteleportboundary(value: (typeof this.data)['portalTeleportBoundary']) { this.data['portalTeleportBoundary'] = value; return this };
    setWarningblocks(value: (typeof this.data)['warningBlocks']) { this.data['warningBlocks'] = value; return this };
    setWarningtime(value: (typeof this.data)['warningTime']) { this.data['warningTime'] = value; return this };
};