import { FileItem, FolderItem } from "../../component/fileItem.js"

const mainNode = document.querySelector("main")

export function clearMain() {
    while (mainNode.hasChildNodes()) {
        const lastChild = mainNode.lastChild
        mainNode.removeChild(lastChild)
    }
}
export function renderMain(items) {
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
}