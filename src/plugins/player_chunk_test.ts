import Player from "src/Entity/Player";
import MapChunk from "src/packets/MapChunk";
import CrackPlugin from "src/structures/Plugin";

const cache = new Map<string, { x: number, z: number }>();
const loaded = new Set<string>();

export default class extends CrackPlugin {
    name: string = "ChunkTest"
    author: string = "Rawir";

    onPosition(sender: Player, { data }) {
        const lastChunk = cache.get(sender.UUID);

        const chunkX = Math.floor(data.x / 16);
        const chunkZ = Math.floor(data.z / 16);

        console.log(`${lastChunk.x} === ${chunkX} || ${lastChunk.z} === ${chunkZ}`)

        if (lastChunk.x === chunkX && lastChunk.z === chunkZ)
            return;

        sender.message(`(x ${data.x}/16 = ${chunkX}, z ${data.z}/16 = ${chunkZ}) ${lastChunk.x} === ${chunkX} || ${lastChunk.z} === ${chunkZ} / chunkX ${chunkX} (${lastChunk.x}) chunkZ ${chunkZ} (${lastChunk.z})`)

        lastChunk.x = chunkX;
        lastChunk.z = chunkZ;

        for (let x = -(9 + chunkX); x < (9 + chunkX); x++)
            for (let z = -(9 + chunkZ); z < (9 + chunkZ); z++) {
                if (loaded.has(`${x},${z}`))
                    continue;

                loaded.add(`${x},${z}`)
                sender.send(new MapChunk().setX(x).setZ(z));

            }


        // for (let x = -16; x < 16; x++)
        //     for (let z = -16; z < 16; z++)
        //         sender.send(new MapChunk().setX(x).setZ(z));
    };

    onPlayerLogin(player: Player) {
        cache.set(player.UUID, { x: null, z: null });
    }
}