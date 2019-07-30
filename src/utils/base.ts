export const basic = (ctx: any, x: number, y: number, radius: number, pos: any, color: any) => {
    //. Default circumference --->
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color.green
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()

    //. Center small circumference --->
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color.green
    ctx.arc(x, y, 10, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()

    //. Get line
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color.red
    ctx.moveTo(x, y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.restore()

    //. Get line circle
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color.red
    ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()
}

const line = (ctx: any, x0: number, y0: number, x1: number, y1: number, color = 'red') => {
    ctx.save()
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.restore()
}

const dot = (ctx: any, x: number, y: number, radius: any, color = 'red') => {
    ctx.save()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
}

const clear = (ctx: any, width: number, height: number) => {
    ctx.save()
    ctx.scale(1,-1)
	ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, width, height)
	ctx.restore()
}

export const base = {
    basic,
    clear,
    line,
    dot
}