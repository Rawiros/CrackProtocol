import { writeFileSync } from 'fs';
import Protocol from 'minecraft-protocol';

const options: Protocol.ClientOptions = {
    host: "0.tcp.eu.ngrok.io",
    port: 15590,
    username: "hangar21241"
};

const client = Protocol.createClient(options);

client.on("packet", (data, meta) => {
    if(meta.name !== "map_chunk") return;

    writeFileSync(`/home/bots/CrackProtocol/worlds/debug/regions/0,0/${data.x},${data.z}.json`, JSON.stringify(data), "utf8");
});