import { readFileSync, writeFileSync } from "fs";
import { Logger } from "tslog";
import path from "path";

try {
    const server = path.join(require.resolve("minecraft-protocol"), "../server.js");
    const JSContent = readFileSync(server, "utf8");

    const _patchedJSContent = JSContent
        .replace(/(var|let) nextId.{0,10}\d+/, "self.nextId = 0;")
        .replace(/=.{0,10}nextId\+\+/, "= self.nextId++;");

    writeFileSync(server, _patchedJSContent);

    // Re-Cache Server Script
    delete require.cache[server];
} catch { }

try {
    new Logger({
        displayLoggerName: false,
        overwriteConsole: true,
        displayFilePath: "hidden",
        dateTimePattern: "hour:minute:second.millisecond",
        displayFunctionName: false,
    });

    // Console.log patching
    console.log = console.info;
} catch { }

export { };