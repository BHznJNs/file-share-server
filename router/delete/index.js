import { rmSync } from "node:fs"
import readDir from "../../utils/readDir.js"

function del(path, type) {
    const fullPath = globalThis.BASE + path
    if (type == "file" || type == "folder") {
        try {
            rmSync(fullPath, { recursive: true })
            return true
        } catch(err) {
            console.warn(err)
            return false
        }
    } else {
        console.warn("Got a unknown type!")
    }
}

export default function(ctx) {
    const {
        folder: folderName,
        name: targetName,
        type: targetType,
    } = ctx.query
    const fullPath = folderName + targetName
    const isDeleted = del(fullPath, targetType)
    const folderContent = readDir(globalThis.BASE + folderName)

    ctx.body = {
        code: Number(!isDeleted),
        current: folderContent,
    }
}