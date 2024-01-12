import NPMPatcher from "./utils/patches";

new NPMPatcher({
    patches: [
        {
            match: /let bitsPerBlock \= Math\.ceil\(Math\.log2\(section\.block_states/gmi,
            replace(value) {
                const replacer = (section: any) => {
                    if (!section.block_states?.palette?.length)
                        section.block_states = {palette: [{Name: "air"}]};

                    if (!section.biomes?.palette?.length)
                        section.biomes={palette:["taiga"]};
                };

                return replacer.toString().slice(14, -2).concat(value)
            },
            files: [
                "/prismarine-provider-anvil/src/1.18/chunk.js"
            ]
        }
    ]
})

// https://github.com/aresrpg/aresrpg/blob/master/package.json
// https://github.com/aresrpg/aresrpg w zakaldce "sexy" na laptopie w brave
// wszystko jest xd
// todo najlepiej w ferie to zrobic
// bo bwdzie w kurwe czasu
// uwu <3