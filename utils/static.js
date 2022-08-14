import send from "koa-send"

/**
 * @description Remove the last slash of a string.
 * @param {string} str 
 */
function rmLastSlash(str) {
    if (str.slice(-1) == "/") {
        return str.slice(0, -1)
    } else {
        return str
    }
}

/**
 * @description Return a function to be used in koa-router
 * @param {string} rootPath The real path in device.
 * @param {string} router The path in server.
 * @returns {function}
 */
export default function(rootPath, router) {
    rootPath = rmLastSlash(rootPath)
    router = rmLastSlash(router)
    return async function(ctx) {
        const path = ctx.path.replace(router, rootPath)
        await send(ctx, rmLastSlash(path))
    }
}