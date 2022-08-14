// Selected Item
globalThis.SELECT = {
    selectedItems: [],
    set(bool, node) {
        if (bool) {
            this.selectedItems.push(node)
        } else {
            // Remove target node from `selectedItems`
            const index = this.selectedItems.indexOf(node)
            this.selectedItems.splice(index, 1)
        }

        const openInNew = document.getElementById("open-in-new")
        console.log(openInNew)
        openInNew.disabled = !Boolean(this.selectedItems.length)
    },
    clear() {
        if (this.selectedItems.length) {
            // copy object
            const nodeArray = [...this.selectedItems]
            for (let item of nodeArray) {
                item.select(false)
            }
        }
    }
}