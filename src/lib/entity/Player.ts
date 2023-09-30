import type { ServerClient, PlayerSettings, BossBarAddData, BossBarUpdateStyleData, WritePacketOptions } from "../../types";
import { Vec3 } from "vec3";
import CrackServer, { BossBarAction } from ".././../index";
import Entity from "./Entity";
import crypto from 'crypto';
import Tags from "../packets/Tags";
import Login from "../packets/Login";
import { get } from "http";

export default class Player extends Entity {
    readonly socket: ServerClient;
    private _settings: PlayerSettings
    private _loadedChunks = new Set<string>();
    private _entityStatus = 0;
    private _spawn_position = { x: 0, y: 0, z: 0 };
    private _spawn_angle = 0;

    private _abilities = {
        flags: 13,
        flyingSpeed: 0.05000000074505806,
        walkingSpeed: 0.10000000149011612
    };

    constructor(server: CrackServer, client: ServerClient) {
        super(server);

        Object.defineProperties(this, {
            socket: { get() { return client } },
            entityId: { get() { return client.id } },
            _uuid: { get() { return client.uuid } },
            _world: {
                value: server.options['default-world'],
                writable: true
            }
        });
    };

    get latency() { return this.socket.latency }
    get username() { return this.socket.username }
    get version() { return this.socket.version }
    get profile() { return this.socket.profile }
    get settings() { return this._settings }
    get loadedChunks() { return Array.from(this._loadedChunks) }
    get protocolVersion() { return this.socket.protocolVersion }
    get entityStatus() { return this._entityStatus }
    get spawnPosition() { return this._spawn_position }
    get spawnAngle() { return this._spawn_angle }
    set entityStatus(status: number) { this.setEntityStatus(status) }
    set worldName(value: string) { this.respawn(this['_world'] = value) }
    set heldItemSlot(slot: number) { this.setHeldItemSlot(slot); super.setHeldItemSlot(slot) }
    set featureFlags(features: string[]) { this.sendFeatureFlags(features) }
    set spawnPosition(pos: Record<"x" | "y" | "z", number>) { this.setSpawnPosition(pos, this._spawn_angle) }
    set spawnAngle(angle: number) { this.setSpawnPosition(this._spawn_position, angle) }

    abilities = new Proxy(this._abilities, {
        set: (target, property, value) => {
            this.write({
                name: "abilities",
                data: Object.assign(target, {
                    [property]: value
                })
            });

            return true
        }
    });

    setHeldItemSlot(slot: number) {
        this.write({
            name: "held_item_slot",
            data: { slot }
        });
    };

    sendFeatureFlags(features: string[]) {
        this.write({
            name: "feature_flags",
            data: { features }
        });
    };

    setEntityStatus(status: number) {
        this.write({
            name: "entity_status",
            data: {
                entityId: this.entityId,
                entityStatus: this._entityStatus = status
            }
        });
    }

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

        this.featureFlags = [
            "minecraft:vanilla",
            "minecraft:bundle",
            "minecraft:update_1_20"
        ];

        this.write({
            name: "difficulty",
            data: {
                difficultyLocked,
                difficulty
            }
        });

        // force to send
        this.abilities.flags = this._abilities.flags;
        this.heldItemSlot = 0;

        this.write({ name: "tags", data: new Tags() });
        this.entityStatus = 28;


        this.write({
            name: "player_info",
            data: {
                action: 63,
                data: [
                    {
                        uuid: crypto.randomUUID(),
                        player: {
                            name: `Node.JS ${process.version}`,
                            properties: []
                        },
                        gamemode: 3,
                        listed: true,
                        latency: -1
                    },
                    {
                        uuid: crypto.randomUUID(),
                        player: {
                            name: `Id ${this.entityId}`,
                            properties: []
                        },
                        gamemode: 3,
                        listed: true,
                        latency: -1
                    },
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

        this.spawnPosition = spawn;

        for (const chunk of Array.from(world.chunks.values()))
            this.loadChunk(chunk.x, chunk.z);

        const UUID = this.createNewBossBar({
            color: 0,
            dividers: 4,
            flags: 0,
            health: 1,
            title: {
                text: `§4§kkk§7 Witaj na serwerze, §c${this.username}§6! §4§kkkk`
            }
        });

        console.log("BossBar for", this.username, "with UUID", UUID);

        this.position = new Vec3(spawn.x, spawn.y, spawn.z);

        this.setHealth();
    };

    loadChunk(chunkX: number, chunkZ: number) {
        const chunk = this.world.getChunk(chunkX, chunkZ);

        if (!chunk)
            return false;

        if (chunk.isUnloaded)
            chunk.load();

        this._loadedChunks.add(`${chunkX},${chunkZ}`);
        this.write({
            name: "map_chunk",
            data: chunk.asPacket
        });

        return true;
    };

    unloadChunk(chunkX: number, chunkZ: number) {
        const chunk = this.world.getChunk(chunkX, chunkZ);

        if (!chunk)
            return false;

        if (chunk.isLoaded)
            chunk.unload();

        this._loadedChunks.delete(`${chunkX},${chunkZ}`);
        this.write({
            name: "unload_chunk",
            data: { chunkX, chunkZ }
        });

        return true;
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

    setSpawnPosition(location: Record<"x" | "y" | "z", number>, angle: number) {
        this._spawn_angle = angle;
        this._spawn_position = location;

        this.write({
            name: "spawn_position",
            data: { location, angle }
        });
    };

    setPosition(pos: Vec3) {
        super.setPosition(pos);

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
                title: JSON.stringify(barData.title)
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
    updateBossBarTitle(barUUID: string, title: any): void {
        this.write({
            name: "boss_bar",
            data: {
                action: BossBarAction.UpdateTitle,
                entityUUID: barUUID,
                title: JSON.stringify(title)
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