import { FileItem, FolderItem } from "../component/fileItem.js"
import requestFolder from "./requestFolder.js"

const mainNode = document.querySelector("main")
// Cancel the select status
// of all the selected items.
mainNode.addEventListener("click", (e) => {
    if (e.target == mainNode) {
        globalThis.SELECT.clear()
    }
})
addEventListener("load", async () => {
    const items = await requestFolder("/")
    const documentFragment = new DocumentFragment()

    for (let item of items) {
        if (item.type == "file") {
            const node = new FileItem(item.name)
            documentFragment.appendChild(node)
        } else if (item.type == "folder") {
            const node = new FolderItem(item.name)
            documentFragment.appendChild(node)
        } else {
            console.error("Unknown Item Type!")
        }
    }
    mainNode.appendChild(documentFragment)
})