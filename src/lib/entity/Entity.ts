import { randomUUID } from "crypto";
import type CrackServer from "../../index";
import { Vec3 } from "vec3";
import EntityType from '../util/EntityType';

type WriteNearOptions = {
    radius?: number

    /**
     * Include current player
     */
    include?: boolean
    name: string
    data: any
}

export default class Entity {
    constructor(server: CrackServer) {
        Object.defineProperty(this, "server", { get() { return server } });

        if (server['_socket'].clients[this.server['_socket'].nextId - 1])
            this.entityId = server['_socket'].nextId++;

        this._uuid = randomUUID();
        this._world = server.options["default-world"];
    };

    type: EntityType = EntityType.Entity;
    server: CrackServer;
    entityId: number;

    onGround: boolean = true;
    private _uuid: string;
    private _health: number = 20;
    private _position: Vec3 = new Vec3(0, 0, 0);
    private _velocity: Vec3 = new Vec3(0, 0, 0);
    private _size = { width: 1, height: 1.8 };
    private _pitch: number = 0;
    private _yaw: number = 0;
    private _food: number = 20;
    private _foodSaturation: number = 5;
    private _world: string;


    get UUID() { return this._uuid }

    set position(value: Vec3) { this.setPosition(value) }
    get position() { return this._position };

    set velocity(value: Vec3) { this._velocity.set(value.x, value.y, value.z) }
    get velocity() { return this._velocity };

    get size() { return this._size }
    get width() { return this._size.width };
    get height() { return this._size.height };

    get health() { return this._health };
    get food() { return this._food };
    get foodSaturation() { return this._foodSaturation };

    set health(value: number) { this.setHealth(value) };
    set food(value: number) { this.setHealth(this._health, value) };
    set foodSaturation(value: number) { this.setHealth(this._health, this._food, value) };

    set pitch(value: number) { this.setLook(value, this._yaw) };
    set yaw(value: number) { this.setLook(this._pitch, value) };
    get pitch() { return this.pitch };
    get yaw() { return this.yaw };

    get chunkX() { return Math.floor(this._position.x / 16) };
    get chunkZ() { return Math.floor(this._position.z / 16) };

    get regionX() { return Math.floor(this._position.x / 32) };
    get regionZ() { return Math.floor(this._position.z / 32) };

    get world() { return this.server.worlds.get(this._world) };
    get chunk() { return this.world.getChunk(this.chunkX, this.chunkZ); };

    get spawn_packet() {
        return this.type === EntityType.Player ? {
            name: "named_entity_spawn",
            data: {
                entityId: this.entityId,
                playerUUID: this.UUID,
                ...this._position,
                pitch: this.pitch,
                yaw: this.yaw,
            }
        } : {
            name: "spawn_entity",
            data: {
                entityId: this.entityId,
                objectUUID: this.UUID,
                type: this.type,
                pitch: this.pitch,
                yaw: this.yaw,
                headPitch: this.pitch,
                objectData: 0,
                velocityX: 0,
                velocityY: 0,
                velocityZ: 0,
                ...this._position
            }
        };
    };

    setHealth(health: number = this['_health'], food: number = this._food, foodSaturation: number = this._foodSaturation) { };

    setLook(yaw: number = this._yaw, pitch: number = this._pitch) {
        if (this._yaw !== yaw)
            this._yaw = Math.toByte(yaw);

        if (this._pitch !== pitch)
            this._pitch = Math.toByte(pitch);

        this.writeNear({
            name: "entity_look",
            data: {
                entityId: this.entityId,
                onGround: this.onGround,
                pitch: this._pitch,
                yaw: this._yaw,
            }
        });
    };

    setPosition(pos: Vec3) {
        this._position.set(pos.x, pos.y, pos.z);

        this.writeNear({
            name: "entity_teleport",
            data: {
                entityId: this.entityId,
                onGround: this.onGround,
                pitch: this._pitch,
                yaw: this._yaw,
                ...this._position
            }
        });
    };

    playSoundNear(soundName: string, soundCategory: 0 = 0, volume = 1, pitch = 1) {
        this.writeNear({
            name: "named_sound_effect",
            data: {
                soundName,
                soundCategory,
                x: this._position.x * 8,
                y: this._position.y * 8,
                z: this._position.z * 8,
                volume,
                pitch,
            }
        });
    };

    /**
     * Write to all players in a specific radius, expect current entity
     */
    writeNear(options: WriteNearOptions) {
        if (!options?.radius)
            options.radius = 8;

        const region = this.world

        if (!region)
            return;

        const chunk = region.chunks.get(`${this.chunkX},${this.chunkZ}`);

        if (!chunk)
            return;

        // Array.from(chunk.players.values())
        //     .filter(e => e['_position'].distanceTo(this._position) <= options.radius && (!!options?.include || e.UUID !== this.UUID))
        //     .forEach(e => e.write({ name: options.name, data: options.data }));
    };

    toString() { return `Entity{TYPE=${this.type};UUID=${this.UUID}}` };
};