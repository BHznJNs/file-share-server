import extname from "../script/extname.js"
import tapEvent from "../script/tapEvent.js"
import requestMove from "../script/request/requestMove.js"
import { clearMain, renderMain } from "../script/main/control.js"

const fileItemTemplate = document.getElementById("file-item-template")
const folderItemTemplate = document.getElementById("folder-item-template")

const iconTypes = new Map([
//  -----------------------------,
    [ "text",    "description"  ],
    [ "code",       "code"      ],
    [ "picture",    "photo"     ],
    [ "video", "ondemand_video" ],
    [ "audio",   "music_video"  ],
    [ "archive",   "archive"    ],
    [ "pdf",   "picture_as_pdf" ],
//  -----------------------------,
])

export class FileItem extends HTMLElement {
    constructor(name) {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = fileItemTemplate.content.cloneNode(true)
        
        // Get corresponding icon by the
        // extname of a file.
        this.itemName = name || this.getAttribute("name")
        const fileType = extname(this.itemName)
        const icon = iconTypes.get(fileType)

        clone.querySelector(".item-name").innerText = this.itemName
        clone.querySelector(".item-icon").innerText = icon
        shadow.appendChild(clone)

        this.draggable = true
        this.type = "file"
        this.item = shadow.querySelector(".file-item")

        if (!("ontouchstart" in document.documentElement)) {
            // Events for desktop device

            // Click events
            this.onclick = () => this.select()
            this.ondblclick = () => this.open()
            this.oncontextmenu = (e) => {
                e.preventDefault()
                this.openInNew()
            }
            // Drag events
            this.ondragstart = () => {
                this.item.classList.add("draging")
                globalThis.DRAG.activate(this)
            }
            this.ondragend = () => {
                this.item.classList.remove("draging")
            }
        }

        // Mobile tap event
        tapEvent(
            this,
            () => this.select(), // single tap
            () => this.open(), // double tap
        )
    }
    select(bool) {
        // If no param, do normal toggle.
        const item = this.item
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
    open() {
        const url = location.href
        const path = globalThis.PATH.value
        const name = this.itemName
        location.href = url + "static" + path + name
    }
    openInNew() {
        const url = location.href
        const path = globalThis.PATH.value
        const name = this.itemName
        window.open(url + "static" + path + name)
    }
}

const folderIcon = "folder"
const folderOpenIcon = "folder_open"
export class FolderItem extends HTMLElement {
    constructor(name) {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = folderItemTemplate.content.cloneNode(true)
        this.itemName = name || this.getAttribute("name")
        clone.querySelector(".item-name").innerText = this.itemName
        shadow.appendChild(clone)

        this.draggable = true
        this.type = "folder"
        this.item = shadow.querySelector(".folder-item")
        this.icon = shadow.querySelector(".item-icon")

        if (!("ontouchstart" in document.documentElement)) {
            // Click Events
            this.onclick = () => this.select()
            this.ondblclick = () => this.open()
            // Drag Events
            this.ondragstart = () => {
                this.item.classList.add("draging")
                globalThis.DRAG.activate(this)
            }
            this.ondragend = () => {
                this.item.classList.remove("draging")
                globalThis.DRAG.deactivate()
            }
            this.ondragover = (e) => e.preventDefault()
            this.ondragenter = () => {
                if (globalThis.DRAG.dragingEl != this) {
                    this.item.classList.add("dropable")
                    this.icon.innerText = folderOpenIcon
                }
            }
            this.ondragleave = () => {
                this.item.classList.remove("dropable")
                this.icon.innerText = folderIcon
            }
            this.ondrop = async () => {
                const targetEl = globalThis.DRAG.dragingEl
                const { itemName } = globalThis.DRAG.deactivate()
                if (targetEl == this) {
                    return
                }

                this.item.classList.remove("dropable")
                this.icon.innerText = folderIcon
                const data = await requestMove(this.itemName, itemName)

                if (!data) {return}
                clearMain()
                renderMain(data.current)
            }
        }
        // Mobile tap event
        tapEvent(
            this,
            () => this.select(), // single tap
            () => this.open(), // double tap
        )
    }
    select(bool) {
        // If no param, do normal toggle.
        const item = this.item
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
    open() {
        globalThis.PATH.push(this.itemName + "/")
    }
}

customElements.define("file-item", FileItem)
customElements.define("folder-item", FolderItem)