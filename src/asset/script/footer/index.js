import requestDelete from "../request/requestDelete.js"
import requestMkdir from "../request/requestMkdir.js"
import { clearMain, renderMain } from "../main/control.js"

const footerEl = document.querySelector("footer")

const openInNew = document.getElementById("open-in-new")
const openInBrowser = document.getElementById("open-in-browser")
const deleteButton = document.getElementById("delete-button")
const createNewFolder = document.getElementById("create-new-folder")
const createNewFolderInput = document.getElementById("create-new-folder-input")

const loopButton = document.getElementById("loop")
const displayGroups = [
    document.querySelectorAll("footer > button[data-display-group='0']"),
    document.querySelectorAll("footer > button[data-display-group='1']")
]

// Open file(s) in new tab(s).
openInNew.onclick = () => {
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
}

// Open single file in current tab.
openInBrowser.onclick = () => {
    const selected = globalThis.SELECT.selectedItems
    const item = selected[0]
    item.open()
}

// Delete seleted items.
deleteButton.onclick = () => {
    const selected = globalThis.SELECT.selectedItems
    const length = selected.length

    for (let i in selected) {
        const el = selected[i]
        requestDelete(el.itemName, el.type)
        .then((data) => {
            if (!data) {return}

            if (i == (length - 1)) {
                clearMain()
                renderMain(data.current)
                globalThis.SELECT.clear()
            }
        })
    }
}

// Create new folder.
createNewFolder.onclick = () => {
    const bool = footerEl.classList.toggle("inputing")
    if (bool) {
        createNewFolderInput.focus()
    }
}
createNewFolderInput.onkeydown = async (e) => {
    if (e.keyCode == 13) {
        // on enter key

        const folderName = createNewFolderInput.value
        if (folderName.includes("/")) {
            alert("Folder name can't include '/'!")
        } else {
            const data = await requestMkdir(folderName)
            if (!data) {return}
            clearMain()
            renderMain(data.current)
        }
        createNewFolderInput.value = ""
    }
}

// Footer display loop.
let displayingGroup = 0 // Value: 0 | 1
const displayGroupNum = 1

function footerToggle() {
    for (let i in displayGroups) {
        if (i == displayingGroup) {
            displayGroups[i].forEach(el => {
                el.classList.remove("disabled")
            })
        } else {
            displayGroups[i].forEach(el => {
                el.classList.add("disabled")
            })
        }
    }
}

loopButton.onclick = () => {
    displayingGroup++
    if (displayingGroup > displayGroupNum) {
        displayingGroup = 0
    }
    
    footerEl.classList.add("offset")
    setTimeout(() => {
        footerToggle()
        footerEl.classList.remove("offset")
    }, 600)
}