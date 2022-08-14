import koaRouter from "koa-router"
import staticMiddleware from "../utils/static.js"
import indexRouter from "./index/index.js"

const router = koaRouter()
router.get("/", indexRouter)
router.get(
    // match the files under the `static` folder.
    /(\/static\/)(.*)/,
    staticMiddleware("./static", "/static/")
)
router.get(
    /(\/asset\/)(.*)/,
    staticMiddleware("./src/asset", "/asset/")
)

export default function(app) {
    app.use(router.routes())
}