import basicFetch from "./fetch.js"

export default function(folderName) {
    const folder = globalThis.PATH.value
    return basicFetch(
        `/mkdir?name=${folderName}&folder=${folder}`,
        "Create folder error!"
    )
}