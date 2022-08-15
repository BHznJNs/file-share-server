import upload from "./upload.js"

// Upload file
const uploader = document.getElementById("uploader")
const uploaderInput = document.getElementById("uploader-input")
uploader.addEventListener("click", () => {
    uploaderInput.click()
})
uploaderInput.addEventListener("change", () => {
    const file = uploaderInput.files[0]
    globalThis.FILE = file
    upload(file)
})