import Koa from "koa"
import koaBody from "koa-body"

import config from "./config.js"
import getLocalIp from "./utils/getLocalIp.js"
import middlewareInstall from "./router/index.js"

const app = new Koa()
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: "./static",
        maxFileSize: 400*1024*1024,
        keepExtensions: true,
        // Reset the file name.
        onFileBegin: (name, file) => {
            const dirPath = "./static/"
            file.filepath = dirPath + name
        }
    }
}))

middlewareInstall(app)

const localIp = getLocalIp()
app.listen(config.port, () => {
    console.log(`http://${localIp}:3000`)
})