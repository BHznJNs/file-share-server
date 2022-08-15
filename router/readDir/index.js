import readDir from "../../utils/readDir.js"

export default function(ctx) {
    const path = ctx.path
    const folderPath = path.replace("/folder", "./static")
    const folderContent = readDir(folderPath)
    ctx.body = folderContent
}