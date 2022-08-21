import basicFetch from "./fetch.js"

export default function(targetFolder, itemName) {
    const path = globalThis.PATH.value
    const oldPath = path + itemName
    const newPath = path + targetFolder + "/" + itemName
    return basicFetch(
        `/move?old_path=${oldPath}&new_path=${newPath}&folder=${path}`,
        "Item move error!"
    )
}