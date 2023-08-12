import type Protocol from 'minecraft-protocol';

type ServerOptions = Protocol.ServerOptions & {
    /**
     * W.I.P Feature
     */
    'chunks-multithreading'?: boolean,

    /**
     * Save modified chunks when chunk is unloading, true by default
     */
    'save-chunks'?: boolean

    'default-world': string
};

export default ServerOptions;