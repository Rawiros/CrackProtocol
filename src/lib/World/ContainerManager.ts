import CrackServer from "src";
import World from "./World";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

export default class ContainerManager {
    readonly server: CrackServer
    readonly world: World
    readonly isReadOnly: boolean;
    readonly containersDir: string;

    constructor(server: CrackServer, world: World) {
        const containersDir: string = path.join(world.worldDir, "containers");

        if (!existsSync(containersDir))
            mkdirSync(containersDir);

        Object.defineProperties(this, {
            server: { get() { return server } },
            world: { get() { return world } },
            isReadOnly: { get() { return world.isReadOnly } },
            containersDir: { get() { return containersDir } }
        });
    };

    createContainerFile(pos: Record<"x" | "y" | "z", number>, data: any) { writeFileSync(path.join(this.containersDir, `${pos.x},${pos.y},${pos.z}.json`), JSON.stringify(data)); }
    getContainerFile(pos: Record<"x" | "y" | "z", number>): any {
        try {
            const data = require(path.join(this.containersDir, `${pos.x},${pos.y},${pos.z}.json`));

            return data;
        } catch { return }
    };
    updateContainerFile(pos: Record<"x" | "y" | "z", number>, data: any, overwrite: boolean = false) {
        const containerPath = path.join(this.containersDir, `${pos.x},${pos.y},${pos.z}.json`);

        try {
            if (overwrite)
                this.createContainerFile(pos, data);
            else
                writeFileSync(containerPath, JSON.stringify(Object.assign(this.getContainerFile(pos), data)));
        } catch { return }
    }
}