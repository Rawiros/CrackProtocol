import Protocol from 'minecraft-protocol';

interface SocketProfile {
    id: string
    name: string
    properties: { name: string, value: string, signature: string }[]
    profileActions: any[]
}

type ServerClient = Omit<Protocol.ServerClient, "profile"> & {
    profile: SocketProfile
}

export default ServerClient;