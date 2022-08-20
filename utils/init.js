import { accessSync, mkdirSync, writeFileSync } from "node:fs"

function access(path) {
    try {
        accessSync(path)
        return true
    } catch {
        return false
    }
}

const configFilePath = "./config.js"
const configFileContent =
`export default {
  "port": "3000",
  "base": "./static",
}`
if (!access(configFilePath)) {
    writeFileSync(configFilePath, configFileContent)
}

const config = await import("../config.js")
const staticFolderPath = config.default.base
globalThis.BASE = staticFolderPath
if (!access(staticFolderPath)) {
    mkdirSync(staticFolderPath)
}