import requestDelete from "../request/requestDelete.js"
import { clearMain, renderMain } from "../main/control.js"

const deleteArea = document.getElementById("delete-area")
deleteArea.ondragover = (e) => e.preventDefault()
deleteArea.ondragenter = () => deleteArea.classList.add("dropable")
deleteArea.ondragleave = () => deleteArea.classList.remove("dropable")
deleteArea.ondrop = async () => {
    deleteArea.classList.remove("dropable")
    const { itemName, type } = globalThis.DRAG.deactivate()

    const data = await requestDelete(itemName, type)
    if (!data) {return}
    clearMain()
    renderMain(data.current)
}

const backButton = document.getElementById("back")
const nextButton = document.getElementById("next")
backButton.onclick = () => globalThis.PATH.back()
nextButton.onclick = () => globalThis.PATH.next()