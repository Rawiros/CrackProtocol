// @ts-nocheck

import Entity from "../Entity/Entity";
import Player from "../Entity/Player";
import Custom from "../packets/Custom";
import CrackPlugin from "../structures/Plugin";
import Protocol from "minecraft-protocol";
import WelcomeMessage from "../plugins/player_welcome";
import MapChunk from "../packets/MapChunk";
import World from "../World";
import { Vec3 } from "vec3";

export default class Server {
    socket: Protocol.Server;
    entities: Record<string, Entity> = {};
    players: Record<string, Player> = {};
    worlds: Record<string, World> = {};
    plugins: CrackPlugin[] = [
        new WelcomeMessage(),
    ];

    get version() { return this.socket.version as string };

    config = {
        port: 25565,
        defaultWorld: "Overworld",
    }

    constructor(options: Protocol.ServerOptions) {
        const socket = Protocol.createServer(options);
        const version = socket.version as string;

        this.worlds = {
            Nether: new World({ worldName: "Nether", spawn: new Vec3(0, 64, 0), version }),
            Overworld: new World({ worldName: "Overworld", spawn: new Vec3(0, 64, 0), version }),
            TheEnd: new World({ worldName: "The End", spawn: new Vec3(0, 64, 0), version }),
        };

        if (!socket.version.startsWith("1.19"))
            console.log("We recommend using latest minecraft version! >:3");

        console.log("There are", this.plugins.length, "plugins loaded");
        console.log("Plugins:", this.plugins.map(plugin => plugin.name).join(", "));

        for (let x = -16; x < 16; x++)
            for (let z = -16; z < 16; z++)
                this.worlds.Overworld.loadChunk(new MapChunk().setX(x).setZ(z).data);

        for (const world of Object.entries(this.worlds))
            console.log(`World "${world[1].worldName}" (${world[0]}) has loaded ${world[1].size} chunks`);

        socket.on("listening", () => console.log(`Listening started on ${options.host || "localhost"}:${options.port || 25565}`))

        socket.on("login", client => {
            const player = new Player(this, client);

            player.login();

            for (const pluginInstance of this.plugins) {
                const eventHandler = pluginInstance["onPlayerLogin"];

                if (eventHandler)
                    eventHandler(player);
            };

            for (let x = -8; x < 8; x++)
                for (let z = -8; z < 8; z++)
                    player.sendChunk(x, z, this.worlds.Overworld.getChunk(x, z));
        });
    };


    inRange(position: Vec3, range = 28) {
        return Object.assign([] as Entity[], Object.values(this.players), Object.values(this.entities))
            .filter(entity => position.distanceTo(entity.position) <= range);
    };

    inRangesend(position: Vec3, range = 28, packet: Custom) {
        for (const player of Object.values(this.players).filter(entity => position.distanceTo(entity.position) <= range))
            player.send(packet);
    };

    toAll(packet: Custom) {
        for (const player of Object.values(this.players))
            player.send(packet);
    };

    toString() { return `Server{VERSION=${this.version}}` };
};