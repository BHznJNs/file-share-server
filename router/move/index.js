import { renameSync } from "node:fs"
import readDir from "../../utils/readDir.js";

export default function(ctx) {
    let {
        old_path: oldPath,
        new_path: newPath,
        folder,
    } = ctx.query

    oldPath = globalThis.BASE + oldPath
    newPath = globalThis.BASE + newPath
    folder = globalThis.BASE + folder

    let code, current
    try {
        renameSync(oldPath, newPath)
        current = readDir(folder)
        code = 0
    } catch(err) {
        code = 1
    }

    ctx.body = { code, current }
}