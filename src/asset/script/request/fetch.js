export default function(path, errMsg) {
    return new Promise((resolve) => {
        fetch(path)
        .then(res => res.json())
        .then(data => {
            if (!data.code) {
                resolve(data)
            } else {
                resolve(null)
                alert("Server side error!")
            }
        })
        .catch(err => {
            console.warn(err)
            alert(errMsg)
            resolve(null)
        })
    })
}