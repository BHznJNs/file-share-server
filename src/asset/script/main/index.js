import { renderMain } from "./control.js"
import requestFolder from "../request/requestFolder.js"

const mainNode = document.querySelector("main")
// Cancel the select status
// of all the selected items.
mainNode.addEventListener("click", (e) => {
    if (e.target == mainNode) {
        globalThis.SELECT.clear()
    }
})
addEventListener("load", async () => {
    const items = await requestFolder("/")
    if (!items) {return}
    renderMain(items.current)
})