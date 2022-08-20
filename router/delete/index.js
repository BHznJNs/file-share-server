import { rmSync, rmdirSync } from "node:fs"
import readDir from "../../utils/readDir.js"

function del(path, type) {
    const func = (type=="file") ?
                rmSync : rmdirSync
    const fullPath = globalThis.BASE + path

    try {
        func(fullPath)
        return true
    } catch (err) {
        console.warn(err)
        return false
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