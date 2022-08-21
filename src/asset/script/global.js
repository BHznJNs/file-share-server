import requestFolder from "./request/requestFolder.js"
import { clearMain, renderMain } from "./main/control.js"

// Global selected item array
const openInNew = document.getElementById("open-in-new")
const openInBrowser = document.getElementById("open-in-browser")
const deleteButton = document.getElementById("delete-button")

globalThis.SELECT = {
    selectedItems: [],
    set(bool, node) {
        if (bool) {
            this.selectedItems.push(node)
        } else {
            // Remove target node from `selectedItems`
            const index = this.selectedItems.indexOf(node)
            this.selectedItems.splice(index, 1)
        }

        const isDisabled = !Boolean(this.selectedItems.length)
        openInNew.disabled = isDisabled
        openInBrowser.disabled = isDisabled
        deleteButton.disabled = isDisabled
    },
    clear() {
        if (this.selectedItems.length) {
            // copy object
            const nodeArray = [...this.selectedItems]
            for (let item of nodeArray) {
                item.select(false)
            }
        }
    }
}

// Global file path
globalThis.PATH = {
    nodes: {
        main: document.getElementById("path"),
        back: document.getElementById("back"),
        next: document.getElementById("next"),
    },
    history: ["/"],
    current: 1,

    disabledControl() {
        const length = this.history.length
        const current = this.current
        this.nodes.back.disabled = !(current > 1)
        this.nodes.next.disabled = !(current < length)
    },
    async refresh() {
        const pathArr = this.history.slice(0, this.current)
        const path = pathArr.join("")
        const data = await requestFolder(path)
        if (!data) {return}

        const current = data.current
        globalThis.SELECT.clear()
        this.value = path
        clearMain()
        renderMain(current)
    },

    push(path) {
        if (this.current < this.history.length) {
            const current = this.current
            const extra = this.history.slice(current)
            const extraNum = extra.length
            this.history.splice(current, extraNum)
        }
        this.history.push(path)
        this.current = this.history.length
        this.disabledControl()
        this.refresh()
    },
    back() {
        if (this.history.length == 1) {
            return
        }
        this.current--
        this.disabledControl()
        this.refresh()
    },
    next() {
        this.current++
        this.disabledControl()
        this.refresh()
    },

    get value() {
        const val = this.nodes.main.innerText
        return val
    },
    set value(val) {
        this.nodes.main.innerText = val
    }
}

// Drag event
globalThis.DRAG = {
    deleteArea: document.getElementById("delete-area"),
    dragingEl: null,

    activate(el) {
        this.deleteArea.classList.add("active")
        this.dragingEl = el
    },
    deactivate() {
        this.deleteArea.classList.remove("active")
        const { itemName, type } = this.dragingEl
        this.dragingEl = null
        return { itemName, type }
    }
}