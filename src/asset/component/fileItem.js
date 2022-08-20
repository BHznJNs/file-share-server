import extname from "../script/extname.js"
import tapEvent from "../script/tapEvent.js"

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
        this.draggable = true
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
                globalThis.DRAG.activate()
            }
            this.ondragend = () => {
                this.item.classList.remove("draging")
                globalThis.DRAG.deactivate({
                    name: this.itemName,
                    type: this.type,
                })
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
    type = "file"
}
export class FolderItem extends HTMLElement {
    constructor(name) {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        const clone = folderItemTemplate.content.cloneNode(true)
        this.itemName = name || this.getAttribute("name")
        clone.querySelector(".item-name").innerText = this.itemName
        shadow.appendChild(clone)

        if (!("ontouchstart" in document.documentElement)) {
            // Click Events
            this.onclick = () => this.select()
            this.ondblclick = () => this.open()
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
        const item = this.shadowRoot.querySelector(".folder-item")
        const isSelected = item.classList.toggle("selected", bool)
        globalThis.SELECT.set(isSelected, this)
    }
    async open() {
        globalThis.PATH.push(this.itemName + "/")
    }
    type = "folder"
}

customElements.define("file-item", FileItem)
customElements.define("folder-item", FolderItem)