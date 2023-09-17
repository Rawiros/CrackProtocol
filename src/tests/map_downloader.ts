import { exists, existsSync, mkdirSync, writeFileSync } from 'fs';
import Protocol from 'minecraft-protocol';
import path from 'path';
import { LevelData } from 'src/types';

const options: Protocol.ClientOptions = {
    host: "7.tcp.eu.ngrok.io",
    port: 12745,
    username: "hangar21241"
};

const client = Protocol.createClient(options);

const WorldName = options.host.replace(/\./g, "-")
const WorldPath = path.join(__dirname, "..", "..", "worlds", WorldName);
const RegionsPath = path.join(WorldPath, "regions");
let Level: Partial<LevelData> = {};

if (!existsSync(WorldPath)) {
    mkdirSync(WorldPath);
    mkdirSync(RegionsPath);
};

client.once("login", data => {
    Object.assign(Level, {
        name: WorldName,
        default_gamemode: 1,
        save_inventory: false,
        difficultyLocked: true,
        difficulty: 0,
        worldType: data.worldType,
        worldName: data.worldName,
        hashedSeed: data.hashedSeed
    });
});

client.once("position", data => {
    Level.spawn = data.spawn;

    writeFileSync(path.join(WorldPath, "level.json"), JSON.stringify(Object.assign(Level, {
        spawn: {
            x: data.x,
            y: data.y,
            z: data.z
        }
    }), null, 4));
});

client.on("packet", (data, meta) => {
    if (meta.name !== "map_chunk") return;

    const RegionFolder = "".concat(Math.floor(data.x / 32).toString(), ",", Math.floor(data.z / 32).toString())
    const RegionPath = path.join(RegionsPath, RegionFolder);

    const ChunkFile = "".concat(data.x, ",", data.z, ".json");
    const ChunkPath = path.join(RegionPath, ChunkFile);

    if (!existsSync(RegionPath))
        mkdirSync(RegionPath);

    writeFileSync(ChunkPath, JSON.stringify(data), "utf8");
});