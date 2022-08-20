const deleteArea = document.getElementById("delete-area")
deleteArea.ondragover = (e) => {
    e.preventDefault()
}
deleteArea.ondragenter = () => {
    deleteArea.classList.add("dropable")
}
deleteArea.ondragleave = () => {
    deleteArea.classList.remove("dropable")
}
deleteArea.ondrop = () => {
    deleteArea.classList.remove("dropable")
    globalThis.DRAG.droped()
}

//
const backButton = document.getElementById("back")
const nextButton = document.getElementById("next")
backButton.onclick = () => globalThis.PATH.back()
nextButton.onclick = () => globalThis.PATH.next()