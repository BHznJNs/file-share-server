import requestDelete from "../request/requestDelete.js"
import { clearMain, renderMain } from "../main/control.js"

const openInNew = document.getElementById("open-in-new")
const openInBrowser = document.getElementById("open-in-browser")
const deleteButton = document.getElementById("delete-button")

// Open file(s) in new tab(s).
openInNew.addEventListener("click", () => {
    const selected = globalThis.SELECT.selectedItems
    for (let item of selected) {
        if (item.type == "file") {
            const url = location.href
            const path = globalThis.PATH.value
            const name = item.itemName
            window.open(url + "static" + path + name)
        } else {
            continue
        }
    }
})

// Open single file in current tab.
openInBrowser.addEventListener("click", () => {
    const selected = globalThis.SELECT.selectedItems
    const item = selected[0]
    item.open()
})

deleteButton.addEventListener("click", () => {
    const selected = globalThis.SELECT.selectedItems
    const length = selected.length

    for (let i in selected) {
        const el = selected[i]
        requestDelete(el.itemName, el.type)
        .then((data) => {
            if (i == (length - 1)) {
                clearMain()
                renderMain(data.current)
                globalThis.SELECT.clear()
            }
        })
    }
})