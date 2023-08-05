import Custom from "src/packets/Custom";

export default class CrackPlugin {
    name = "Example";
    version = "0.0.1";
    author = "Your Name";

    onDisable(): Promise<any> | any { console.log(`Plugin "${this.name}" ${this.version}v by ${this.author} started`) };
    onEnable(): Promise<any> | any { console.log(`Plugin "${this.name}" ${this.version}v by ${this.author} hhh`) };
}