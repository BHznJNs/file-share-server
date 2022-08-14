export default function (name) {
    const splited = name.split(".")
    if (splited.length == 1) {
        return "text"
    }

    const extname = splited[splited.length - 1]
    let fileType = ""
    switch (extname) {
        // Picture file types
        case "jpeg": case "jpg":
        case "tiff": case "tif":
        case "webp":
        case "indd":
        case "png":
        case "gif":
        case "ico":
        case "svg":
        case "eps":
        case "psd":
        case "raw":
            fileType = "picture"
            break
        case "pdf":
            fileType = "pdf"
            break

        // Video file types.
        case "rmvb": case "rm":
        case "avchd":
        case "avi":
        case "mov":
        case "mp4":
        case "flv":
        case "wmv":
        case "asf":
        case "asx":
        case "3gp":
        case "mkv":
        case "dat":
            fileType = "video"
            break

        // Audio file types
        case "aiff": case "aif":
        case "midi": case "mid":
        case "flac":
        case "ogg":
        case "cda":
        case "wav":
        case "mp3":
        case "m4a":
        case "wma":
        case "ra":
        case "vqf":
        case "ape":
            fileType = "audio"
            break

        // Archive file types.
        case "7z": case "gz": case "xz":
        case "cpio":
        case "epub":
        case "lzma":
        case "rar":
        case "zip":
        case "apk":
        case "tar":
        case "bz2":
        case "cbz":
        case "jar":
        case "oxt":
        case "xpi":
            fileType = "archive"
            break

        // Program languages file types.
        case "for": case "f90": case "f":
        case "cpp": case "c": case "h":
        case "xhtml": case "xml":
        case "html": case "htm":
        case "aspx": case "asp":
        case "pl": case "pm":
        case "class":
        case "swift":
        case "scala":
        case "java":
        case "dart":
        case "lisp":
        case "asm":
        case "php":
        case "jsp":
        case "sql":
        case "lua":
        case "scm":
        case "ps1":
        case "rss":
        case "sass":
        case "less":
        case "css":
        case "ejs":
        case "js":
        case "ts":
        case "py":
        case "kt":
        case "cs":
        case "rs":
        case "go":
        case "vb":
        case "rb":
        case "sh":
        case "hs":
        case "p":
        case "m":
        case "r":
            fileType = "code"
            break

        default:
            fileType = "text"
            break
    }
    return fileType
}
