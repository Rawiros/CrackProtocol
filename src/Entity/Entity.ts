import { randomUUID } from "crypto";
import { Vec3 } from "vec3";
import Player from "./Player";

export default class Entity {
    UUID: string = randomUUID();
    entityId: number;
    type: number;
    server: Server;

    private _health: number = 20;
    private _position: Vec3 = new Vec3(0, 0, 0);
    private _velocity: Vec3 = new Vec3(0, 0, 0);
    private _pitch: number = 0;
    private _yaw: number = 0;
    private _food: number = 20;
    private _foodSaturation: number = 5;
    private _worldName = "Overworld";
    onGround: boolean = true;

    size = { width: 1, height: 1 };

    set position(value: Vec3) { this.setPosition(value) }
    get position() { return this._position };

    set velocity(value: Vec3) { this._velocity.set(value.x, value.y, value.z) }
    get velocity() { return this._velocity };

    get width() { return this.size.width };
    get height() { return this.size.height };

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

    get worldName() { return this._worldName };
    get chunkX() { return Math.floor(this._position.x / 16) };
    get chunkZ() { return Math.floor(this._position.z / 16) };

    get world() { return this.server.worlds[this._worldName] };
    get chunk() { return this.world.getChunk(this.chunkX, this.chunkZ); };

    get spawn_packet() {
        if (this instanceof Player)
            return new Custom('named_entity_spawn', {
                entityId: this.entityId,
                playerUUID: this.UUID,
                ...this._position,
                pitch: this.pitch,
                yaw: this.yaw,
            });

        return new Custom('spawn_entity', {
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
        });
    };

    setHealth(health: number = this['_health'], food: number = this._food, foodSaturation: number = this._foodSaturation) {
        if (this instanceof Player)
            this.writePacket('update_health', {
                health: this._health = health,
                food: this._food = food,
                foodSaturation: this._foodSaturation = foodSaturation
            });
    };

    setLook(yaw: number = this._yaw, pitch: number = this._pitch) {
        if (this._yaw !== yaw)
            this._yaw = Math.toByte(yaw);

        if (this._pitch !== pitch)
            this._pitch = Math.toByte(pitch);

        if (this instanceof Player)
            this.writePacket('position', {
                ...this._position,
                yaw: this._yaw,
                pitch: this._pitch,
                flags: 0,
                teleportId: 0,
                dismountVehicle: false
            });

        console.log('entity_look', {
            entityId: this.entityId,
            onGround: this.onGround,
            pitch: this._pitch,
            yaw: this._yaw,
        });
    };

    setPosition(pos: Vec3) {
        this._position.set(pos.x, pos.y, pos.z);

        if (this instanceof Player)
            this.writePacket('position', {
                pitch: this._pitch,
                yaw: this._yaw,
                teleportId: 0,
                dismountVehicle: false,
                flags: 0,
                ...this._position
            });

        // do kazdego w poblizu
        console.log('entity_teleport', {
            entityId: this.entityId,
            onGround: this.onGround,
            pitch: this._pitch,
            yaw: this._yaw,
            ...this._position
        });
    };

    playSoundNear(soundName: string, soundCategory: SoundCategory = SoundCategory.MASTER, volume = 1, pitch = 1) {
        console.log('named_sound_effect', {
            soundName,
            soundCategory,
            x: this._position.x * 8,
            y: this._position.y * 8,
            z: this._position.z * 8,
            volume,
            pitch,
        });
    };

    toString() { return `Entity{TYPE=${this.type},UUID=${this.UUID}}` };
};