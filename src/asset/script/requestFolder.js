export default function(path) {
    return new Promise((resolve, reject) => {
        fetch("/folder" + path)
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
        .catch(err => reject(err))
    })
}