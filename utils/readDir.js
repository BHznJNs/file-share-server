import { readdirSync, statSync } from "node:fs"

export default function(path) {
    const target = []
    try {
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
    } catch(err) {
        console.warn(err)
        return null
    }
    return target
}
