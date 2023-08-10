import Protocol from 'minecraft-protocol';

interface SocketProfile {
    id: string
    name: string
    properties: { name: string, value: string, signature: string }[]
    profileActions: any[]
}

interface UserSettings {
    locale: string
    viewDistance: number
    chatFlags: number
    chatColors: boolean
    skinParts: number
    mainHand: 0 | 1
}

type ServerClient = Omit<Protocol.ServerClient, "profile"> & {
    profile: SocketProfile
}

export default ServerClient;