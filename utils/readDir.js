import { readdirSync, statSync } from "node:fs"

export default function(path) {
    const target = []
    // Get names of files under target folder.
    const files = readdirSync(path)
    for (let file of files) {
        const fullpath = path + "/" + file
        // Check is the item a file or a folder.
        const stat = statSync(fullpath)
        const fileObj = {
            name: file,
            type: (stat.isFile()) ? "file" : "folder",
        }
        target.push(fileObj)
    }
    return target
}
