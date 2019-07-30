/*
 * File: /Users/tonymedrano/Desktop/calculus-trigonometry-sw/src/utils/background.ts
 * Project: /Users/tonymedrano/Desktop/calculus-trigonometry-sw
 * Created Date: Thursday May 9th 2019
 * Author: tonymedrano
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2019 CALCULUS TYPESCRIPT SW by TONY MEDRANO
 */

export const background = (
  ctx: any,
  minor: any = 10,
  major: any = minor * 5,
  grid?: any,
  fill?: any,
) => {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.save()
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = `rgba(${fill.r}, ${fill.g}, ${fill.b}, ${fill.a})`
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.fillStyle = grid
  ctx.strokeStyle = grid
  ctx.globalCompositeOperation='destination-over'
  for (let x = 0; x < width; x += minor) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.lineWidth = x % major == 0 ? 0.5 : 0.25
    ctx.stroke()
    if (x % major == 0) {
      ctx.fillText(x, x, 10)
    }
  }
  for (let y = 0; y < height; y += minor) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.lineWidth = y % major == 0 ? 0.5 : 0.25
    ctx.stroke()
    if (y % major == 0) {
      ctx.fillText(y, 0, y + 10)
    }
  }
  ctx.restore()
  
}
