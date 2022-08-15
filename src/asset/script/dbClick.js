export default function(obj) {
    console.log(obj.__dbClick)
    if (obj.__dbClick) {
        obj.open()
    } else {
        obj.__dbClick = setTimeout(
            () => {
                obj.__dbclick = null
        }, 300)
    }
}