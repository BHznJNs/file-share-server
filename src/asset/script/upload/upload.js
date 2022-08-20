import { clearMain, renderMain } from "../main/control.js";

export default function(file) {
    const formData = new FormData()
    const folderPath = globalThis.PATH.value
    const fullPath = folderPath + file.name
    formData.append(fullPath, file)
    formData.append("folderPath", folderPath)

    fetch("/upload", {
        method: "POST",
        body: formData,
    })
    .then(res => res.json())
    .then(json => {
        if (!json.code) {
            const items = json.current
            clearMain()
            renderMain(items)
        } else {
            throw new Error
        }
    })
    .catch(err => {
        console.warn(err)
        globalThis.MSG.open("Upload request error!")
    })
}