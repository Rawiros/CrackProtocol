import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const nodeModules = module.require.main.paths.find(e => e.endsWith("/node_modules") && existsSync(e));

export interface Options {
    patches: Patch[]
}

export interface Patch {
    match: RegExp | string;
    replace(value: string): string;
    files: string[]
}

const symbol = Symbol("Rawir.Utility.NPMPatcher").toString();
export default class NPMPatcher {
    constructor({ patches }: Options) {
        const cache = module.require.cache;

        for (const patch of patches)
            for (const fullPath of patch.files.map(e => path.join(nodeModules, e))) {
                const content = readFileSync(fullPath, "utf8");

                if (content.includes(symbol))
                    continue;

                const match = content.match(patch.match);

                if (!match?.length)
                    continue;

                writeFileSync(fullPath, content.replace(match[0], patch.replace(match[0])));

                if (cache && cache[fullPath])
                    delete cache[fullPath]
            }
    }
};