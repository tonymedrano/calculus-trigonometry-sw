export const Drawing = (ctx: any, color = '#fff') => {
    let mouseClicked = false

    const onMouseClick = () => {
        mouseClicked = !mouseClicked
    }

    const onMouseMove = (event: any) => {
        if (mouseClicked) {
            ctx.save()
            ctx.beginPath()
            ctx.arc(event.clientX, event.clientY, 1, 0, Math.PI * 2, false)
            ctx.lineWidth = 5
            ctx.strokeStyle = color
            ctx.stroke()
            ctx.restore()
        }
    }

    document.addEventListener('click', onMouseClick, false)
    document.addEventListener('mousemove', onMouseMove, false)
}