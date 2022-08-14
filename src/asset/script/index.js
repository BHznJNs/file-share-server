import "/asset/component/fileItem.js"
import "./global.js"

const mainNode = document.querySelector("main")
mainNode.addEventListener("click", (e) => {
    if (e.target == mainNode) {
        globalThis.SELECT.clear()
    }
})