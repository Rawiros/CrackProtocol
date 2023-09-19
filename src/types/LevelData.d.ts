type LevelData = {
    name: string,
    default_gamemode: number,
    save_inventory: boolean,
    spawn: Record<"x" | "y" | "z", number>,
    difficultyLocked: boolean,
    difficulty: number,
    worldType: string,
    worldName: string,
    hashedSeed: [number, number],
    readonly?: boolean
}

export default LevelData;