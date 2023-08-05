// @ts-ignore
globalThis.C = (value: string) => Array.isArray(value) ? value[0].replaceAll("&", "§") : value.replaceAll("&", "§"); 

export { default as Server } from "./structures/server";
export { default as Entity } from "./Entity/Entity";
export { default as Player } from "./Entity/Player";