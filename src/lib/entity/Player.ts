import { ServerClient, PlayerSettings } from "../../types";
import { Vec3 } from "vec3";
import CrackServer, { BossBarAction } from ".././../index";
import Entity from "./Entity";
import Tags from "../packets/Tags";
import Login from "../packets/Login";
import DataBossbar, { BossBarAddData, BossBarUpdateStyleData } from "src/types/DataBossbar";

type WritePacketOptions = {
    name: string,
    data: any
}

export default class Player extends Entity {
    socket: ServerClient;
    settings: PlayerSettings

    constructor(server: CrackServer, client: ServerClient) {
        super(server);

        this.socket = client;

        this['_uuid'] = this.socket.uuid;
        this['_world'] = server.options["default-world"];
    };

    get latency() { return this.socket.latency; };
    get username() { return this.socket.username; };
    get version() { return this.socket.version; };
    get profile() { return this.socket.profile; };
    get protocolVersion() { return this.socket.protocolVersion };
    set worldName(value: string) { this.respawn(this['_world'] = value); };

    /**
     * Send everything to player what is required to start rendering world client side
     */
    login() {
        const world = this.world;
        const { worldType, worldName, hashedSeed, default_gamemode, difficultyLocked, difficulty, spawn } = world.level;

        this.write({
            name: "login",
            data: new Login()
                .setEntityid(this.entityId)
                .setGamemode(default_gamemode)
                .setWorldtype(worldType)
                .setWorldname(worldName)
                .setHashedseed(hashedSeed)
        });

        this.write({
            name: "feature_flags",
            data: {
                features: [
                    "minecraft:vanilla",
                    "minecraft:bundle",
                    "minecraft:update_1_20"
                ]
            }
        });

        this.write({
            name: "difficulty",
            data: {
                difficultyLocked,
                difficulty
            }
        });

        this.write({
            name: "abilities",
            data: {
                flags: 13,
                flyingSpeed: 0.05000000074505806,
                walkingSpeed: 0.10000000149011612
            }
        });

        this.write({
            name: "held_item_slot",
            data: {
                slot: 0
            }
        });

        this.write({
            name: "tags",
            data: new Tags()
        });

        this.write({
            name: "entity_status",
            data: {
                entityId: this.entityId,
                entityStatus: 28
            }
        });

        this.write({
            name: "player_info",
            data: {
                action: 63,
                data: [
                    {
                        uuid: this.UUID,
                        player: {
                            name: this.username,
                            properties: !this.profile?.properties ? this.profile.properties : []
                        },
                        gamemode: default_gamemode,
                        listed: true,
                        latency: this.latency
                    }
                ]
            }
        });

        this.write({
            name: "spawn_position",
            data: {
                location: spawn,
                angle: 0
            }
        });

        for (const chunk of Array.from(this.world.regions.get("0,0").chunks.values()))
            this.write({
                name: "map_chunk",
                data: chunk.asPacket
            });

        // for (let x = -8; x < 8; x++)
        //     for (let z = -8; z < 8; z++)
        //         this.write({
        //             name: "map_chunk",
        //             data: this.world.getChunk(x, z).asPacket
        //         });

        this.position = new Vec3(spawn.x, spawn.y, spawn.z);

        this.setHealth();
    };

    respawn(worldname: string) {
        const world = this.server.worlds.get(worldname);
        const { worldType, worldName, hashedSeed, default_gamemode } = world.level;

        this.write({
            name: "respawn",
            data: {
                worldName,
                dimension: worldType,
                hashedSeed,
                gamemode: default_gamemode,
                previousGamemode: -1,
                isDebug: false,
                isFlat: false,
                copyMetadata: true
            }
        });
    };

    message(text: string, isActionBar = false) {
        this.write({
            name: "system_chat",
            data: { isActionBar, content: JSON.stringify({ text }) }
        });
    };

    setHealth(health: number = this['_health'], food: number = this['_food'], foodSaturation: number = this['_foodSaturation']) {
        this.write({
            name: "update_health",
            data: {
                health: this['_health'] = health,
                food: this['_food'] = food,
                foodSaturation: this['_foodSaturation'] = foodSaturation
            }
        });

        super.setHealth(health, food, foodSaturation);
    };

    setPosition(pos: Vec3) {
        this['_position'].set(pos.x, pos.y, pos.z);

        this.write({
            name: "position",
            data: {
                ...this['_position'],
                yaw: this['_yaw'],
                pitch: this['_pitch'],
                flags: 0,
                teleportId: 0,
                dismountVehicle: false
            }
        });

        super.setPosition(pos);
    };

    setLook(yaw: number = this['_yaw'], pitch: number = this['_pitch']) {
        if (this['_yaw'] !== yaw)
            this['_yaw'] = Math.toByte(yaw);

        if (this['_pitch'] !== pitch)
            this['_pitch'] = Math.toByte(pitch);

        this.write({
            name: "position",
            data: {
                ...this['_position'],
                yaw: this['_yaw'],
                pitch: this['_pitch'],
                flags: 0,
                teleportId: 0,
                dismountVehicle: false
            }
        });

        super.setLook(yaw, pitch);
    };

    /**
    * Create a new Boss Bar for a player.
    * @param barData - The data for creating the Boss Bar.
    * @returns The UUID of the created Boss Bar.
    */
    createNewBossBar(barData: Omit<BossBarAddData, "entityUUID" | "action">): string {
        const barUUID = crypto.randomUUID();

        this.write({
            name: "boss_bar",
            data: {
                ...barData,
                action: BossBarAction.Add,
                entityUUID: barUUID,
            },
        });

        return barUUID;
    };

    /**
     * Remove a Boss Bar for a player.
     * @param barUUID - The UUID of the Boss Bar to be removed.
     */
    removeBossBar(barUUID: string): void {
        this.write({
            name: "boss_bar",
            data: {
                action: BossBarAction.Remove,
                entityUUID: barUUID,
            },
        });
    };

    /**
     * Update the health value of a Boss Bar.
     * @param barUUID - The UUID of the Boss Bar to be updated.
     * @param health - The new health value for the Boss Bar.
     */
    updateBossBarHealth(barUUID: string, health: number): void {
        this.write({
            name: "boss_bar",
            data: {
                action: BossBarAction.UpdateHealth,
                entityUUID: barUUID,
                health,
            },
        });
    }

    /**
     * Update the title of a Boss Bar.
     * @param barUUID - The UUID of the Boss Bar to be updated.
     * @param title - The new title for the Boss Bar.
     */
    updateBossBarTitle(barUUID: string, title: string): void {
        this.write({
            name: "boss_bar",
            data: {
                action: BossBarAction.UpdateTitle,
                entityUUID: barUUID,
                title,
            },
        });
    };

    /**
     * Update the style of a Boss Bar.
     * @param barUUID - The UUID of the Boss Bar to be updated.
     * @param styleData - The new style data for the Boss Bar.
     */
    updateBossBarStyle(barUUID: string, styleData: Omit<BossBarUpdateStyleData, "action" | "entityUUID">): void {
        this.write({
            name: "boss_bar",
            data: {
                ...styleData,
                action: BossBarAction.UpdateStyle,
                entityUUID: barUUID,
            },
        });
    };

    /**
     * Update the flags of a Boss Bar.
     * @param barUUID - The UUID of the Boss Bar to be updated.
     * @param flags - The new flags for the Boss Bar.
     */
    updateBossBarFlags(barUUID: string, flags: number): void {
        this.write({
            name: "boss_bar",
            data: {
                action: BossBarAction.UpdateFlags,
                entityUUID: barUUID,
                flags,
            },
        });
    };

    write(options: WritePacketOptions) {
        this.socket.write(options.name, options.data?.normalized_name ? options.data['data'] : options.data);
    };

    toString() { return `Player{UUID=${this.UUID};VERSION=${this.socket.version};LATENCY=${this.socket.latency}}` };
};