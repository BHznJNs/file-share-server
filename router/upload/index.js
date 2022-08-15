export default function(ctx) {
    console.log(ctx.request.files)

    ctx.body = {msg: "OK"}
}