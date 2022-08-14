import extname from "../script/extname.js"

const fileItemTemplate = document.getElementById("file-item-template")
const folderItemTemplate = document.getElementById("folder-item-template")

const iconTypes = {
    "text": "description",
    "code": "code",
    "picture": "photo",
    "video": "ondemand_video",
    "audio": "music_video",
    "archive": "archive",
    "pdf": "picture_as_pdf",
}

class FileItem extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = fileItemTemplate.content.cloneNode(true)
        const fileName = this.getAttribute("name")
        const fileType = extname(fileName)
        const icon = iconTypes[fileType]
        clone.querySelector(".item-name").innerText = fileName
        clone.querySelector(".item-icon").innerText = icon
        shadow.appendChild(clone)

        this.addEventListener("click", () => {
            this.select()
        })
    }
    select(bool) {
        // If no param, do normal toggle.
        const item = this.shadowRoot.querySelector(".file-item")
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
}
class FolderItem extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = folderItemTemplate.content.cloneNode(true)
        const folderName = this.getAttribute("name")
        clone.querySelector(".item-name").innerText = folderName
        shadow.appendChild(clone)

        this.addEventListener("click", () => {
            this.select()
        })
    }
    select(bool) {
        // If no param, do normal toggle.
        const item = this.shadowRoot.querySelector(".folder-item")
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
}

customElements.define("file-item", FileItem)
customElements.define("folder-item", FolderItem)