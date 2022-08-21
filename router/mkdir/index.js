import { mkdirSync } from "node:fs"
import readDir from "../../utils/readDir.js"

export default function(ctx) {
    const {name, folder} = ctx.query
    
    let code, current
    try {
        mkdirSync(globalThis.BASE + folder + name)
        current = readDir(globalThis.BASE + folder)
        code = 0
    } catch(err) {
        console.warn(err)
        code = 1
    }

    ctx.body = { code, current }
}