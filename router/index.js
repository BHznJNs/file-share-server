import koaRouter from "koa-router"

import staticMiddleware from "../utils/static.js"
import indexRouter from "./index/index.js"
import uploadRouter from "./upload/index.js"
import deleteRouter from "./delete/index.js"
import readDirRouter from "./readDir/index.js"
import config from "../config.js"

const router = koaRouter()

router.get("/", indexRouter)
router.post("/upload", uploadRouter)
router.get("/delete", deleteRouter)
router.get(
    /(\/folder\/)(.*)/,
    readDirRouter,
)
router.get(
    // match the files under the `static` folder.
    /(\/static\/)(.*)/,
    staticMiddleware(
        config.base,
        "/static/",
    ),
)
router.get(
    /(\/asset\/)(.*)/,
    staticMiddleware("./src/asset", "/asset/"),
)

export default function(app) {
    app.use(router.routes())
}