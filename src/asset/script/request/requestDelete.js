import basicFetch from "./fetch.js"

export default function(name, type) {
    const folder = globalThis.PATH.value
    return basicFetch(
        `/delete?folder=${folder}&name=${name}&type=${type}`,
        "Delete request error!"
    )
}