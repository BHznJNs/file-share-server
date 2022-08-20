import readDir from "../../utils/readDir.js"

export default function(ctx) {
    const folderPath = ctx.request.body.folderPath
    const path = globalThis.BASE + folderPath
    const current = readDir(path)
    ctx.body = {
        code: 0,
        current,
    }
}