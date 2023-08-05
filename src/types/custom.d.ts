declare global {
    interface Math {
        toByte(degress: number): number
        limit(value: number, min = 0, max = 128): number
    }
}

export {};