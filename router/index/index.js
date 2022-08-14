import send from "koa-send"

export default async function(ctx) {
    await send(ctx, "./src/index.html")
}