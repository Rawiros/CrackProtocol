import type Protocol from 'minecraft-protocol';

type ServerSocket = Protocol.Server & Partial<{
    version: string,
    nextId: number
}>

export default ServerSocket;