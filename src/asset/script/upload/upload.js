export default function(file) {
    const formData = new FormData()
    console.log(file)
    formData.append(file.name, file)
    fetch("/upload", {
        method: "POST",
        body: formData,
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.warn(err))
}