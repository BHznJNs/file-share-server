import Koa from "koa"
import middlewareInstall from "./router/index.js"

const app = new Koa()

middlewareInstall(app)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})