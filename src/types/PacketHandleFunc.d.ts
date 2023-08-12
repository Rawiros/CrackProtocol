import Protocol from 'minecraft-protocol';
import Player from 'src/lib/entity/Player';

type PacketHandleFunc = (player: Player, data: any, packetMeta: Protocol.PacketMeta) => void;

export default PacketHandleFunc;