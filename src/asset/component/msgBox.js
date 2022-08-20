class MsgBox extends HTMLDivElement {
    constructor() {
        super()
        this.onclick = this.close
    }

    open(msg) {
        this.innerText = msg
        this.classList.add("active")
        setTimeout(() => {
            this.close()
        }, 5000)
    }
    close() {
        this.classList.remove("active")
        this.innerText = ""
    }
}
customElements.define(
    "msg-box", MsgBox,
    { extends: "div" }
)