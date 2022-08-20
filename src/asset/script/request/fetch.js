export default function(path, errMsg) {
    return new Promise((resolve) => {
        fetch(path)
        .then(res => res.json())
        .then(data => {
            if (!data.code) {
                resolve(data)
            } else {
                resolve(null)
                globalThis.MSG.open("Server side error!")
            }
        })
        .catch(err => {
            console.warn(err)
            globalThis.MSG.open(errMsg)
            resolve(null)
        })
    })
}