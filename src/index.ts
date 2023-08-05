import Protocol from "minecraft-protocol";
import { ServerSocket, ServerOptions } from "./types"

class CrackServer {
    _socket: ServerSocket;

    options: ServerOptions;
    worlds = new Map<string, any>;

    constructor(options: ServerOptions) {
        const socket = (this._socket = Protocol.createServer(options), this._socket);

        process.env.MINECRAFT_VERSION = options.version || socket.version;
    };


    get version() { return this._socket.version; };

    toString() { return `CrackServer{PID=${process.pid};VERSION=${this.version};WORLDS=${Object.keys(this.worlds).join(",")}}` }
};

export default CrackServer;