import Player from "src/Entity/Player";
import CrackPlugin from "src/structures/Plugin";
import PrismBlock from 'prismarine-block';

// @ts-ignore
const Block = PrismBlock("1.19.3") as typeof PrismBlock['Block'];

export default class extends CrackPlugin {
    name: string = "WelcomeMessage"
    author: string = "Rawir";

    onBlockPlace(sender: Player, { data: { location } }) {
        const chunk = sender.chunk;

        if (!chunk)
            return sender.message(C(`&3Chunk na &bx &8${sender.chunkX} &8/ &bz &8${sender.chunkZ} &4nie istnieje w pamięci!`));

        const block = chunk.getBlock(location);

        if (!block)
            return sender.message(C(`&3Na kordynatach &bx &8${location.x} &8/ &by &8${location.y} &8/ &bz &8${location.z} &bnie znajduje sie zaden blok!`))

        sender.message(C(`&3Na kordynatach &bx &8${location.x} &8/ &by &8${location.y} &8/ &bz &8${location.z} &bznajduje sie &8${block.name}:${block.stateId} &b(&8${block.displayName}&b)`))

        // chunk.setBlock(location, new Block())
    };

    onPlayerLogin(player: Player) {
        // player.socket.on("packet", (d, m) => console.log(m.name, d))
        player.message(C(`&3Witaj &b${player.username} &3to jest testowa wiadomosc ktora wykorzystuje &bCrackProtocol!`))
        // setInterval(() => {
        //     player.health = Math.max(1, Math.min(Math.floor(Math.random() * 20), 20));

        //     player.message(C(`&4Gracz &c${player.username} &4ma teraz &c${player.health} &4❤`))
        // }, 1000);
    };
}