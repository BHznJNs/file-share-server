const delay = 400
const dbTapDelay = 300

/**
 * 
 * @param {Node} el target element
 * @param {Function} singletapCb single tap callback
 * @param {Function} dbTapCb double tap callback
 */
export default function(el, singletapCb, dbTapCb) {
    el.startTime = 0
    el.isMoved = false
    el.dbTap = null

    el.ontouchstart = (e) => {
        // e.preventDefault()
        el.startTime = Date.now()
    }
    el.ontouchmove = () => {
        el.isMoved = true
    }
    el.ontouchend = () => {
        const endTime = Date.now()
        if ((endTime - el.startTime) <= delay && !el.isMoved) {
            if (el.dbTap) {
                // Have been tapped once.
                dbTapCb()
            } else {
                // First time of tap.
                singletapCb()

                el.dbTap = setTimeout(() => {
                    clearTimeout(el.dbTap)
                    el.dbTap = null
                }, dbTapDelay)
            }
        }
        el.startTime = 0
        el.isMoved = false
    }
}