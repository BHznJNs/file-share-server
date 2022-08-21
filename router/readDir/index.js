import readDir from "../../utils/readDir.js"

export default function(ctx) {
    const path = decodeURI(ctx.path)
    const folderPath = path.replace("/folder", globalThis.BASE)
    const folderContent = readDir(folderPath)
    let returnCode = null
    if (folderContent == null) {
        returnCode = 1
    } else {
        returnCode = 0
    }
    ctx.body = {
        code: returnCode,
        current: folderContent,
    }
}