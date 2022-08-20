import basicFetch from "./fetch.js"

export default function(path) {
    return basicFetch(
        "/folder" + path,
        "Folder request error, please refresh!"
    )
}