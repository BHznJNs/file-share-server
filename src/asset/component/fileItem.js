import extname from "../script/extname.js"
import dbClick from "../script/dbClick.js"
import requestFolder from "../script/requestFolder.js"

const fileItemTemplate = document.getElementById("file-item-template")
const folderItemTemplate = document.getElementById("folder-item-template")

const iconTypes = new Map([
    ["text", "description"],
    ["code", "code"],
    ["picture", "photo"],
    ["video", "ondemand_video"],
    ["audio", "music_video"],
    ["archive", "archive"],
    ["pdf", "picture_as_pdf"],
])

export class FileItem extends HTMLElement {
    constructor(name) {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = fileItemTemplate.content.cloneNode(true)
        
        // Get corresponding icon by the
        // extname of a file.
        this.fileName = name || this.getAttribute("name")
        const fileType = extname(this.fileName)
        const icon = iconTypes.get(fileType)

        clone.querySelector(".item-name").innerText = this.fileName
        clone.querySelector(".item-icon").innerText = icon
        shadow.appendChild(clone)

        this.addEventListener("click", () => {
            this.select()

            dbClick(this)
        })
    }
    __dbClick = null

    select(bool) {
        // If no param, do normal toggle.
        const item = this.shadowRoot.querySelector(".file-item")
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
    open() {
        const url = location.href
        const name = this.fileName
        location.href = url + "static/" + name
    }
}
export class FolderItem extends HTMLElement {
    constructor(name) {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = folderItemTemplate.content.cloneNode(true)
        this.folderName = name || this.getAttribute("name")
        clone.querySelector(".item-name").innerText = this.folderName
        shadow.appendChild(clone)

        this.addEventListener("click", () => {
            this.select()

            dbClick(this)
        })
    }
    select(bool) {
        // If no param, do normal toggle.
        const item = this.shadowRoot.querySelector(".folder-item")
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
    __dbClick = null
    open() {
        const name = this.folderName
        requestFolder("/" + name)
    }
}

customElements.define("file-item", FileItem)
customElements.define("folder-item", FolderItem)