// This packet was 0

const normalize = (value: string) => value.toLowerCase().split("_").map(e => e[0].toUpperCase().concat(e.slice(1))).join("");
const toUpper = (value: string) => value[0].toUpperCase().concat(value.slice(1));

export default class Custom {
    name = "custom";
    normalized_name = "Custom";
    data = {};
    cancelled?: boolean;
    constructor(packetName: string, packetData: any) { this.name = packetName; this.normalized_name = toUpper(normalize(this.name)); this.data = packetData }
};