/*
 * File: /Users/tonymedrano/Desktop/calculus-trigonometry-sw/src/sine-wave.ts
 * Project: /Users/tonymedrano/Desktop/calculus-trigonometry-sw
 * Created Date: Thursday May 9th 2019
 * Author: tonymedrano
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2019 CALCULUS TYPESCRIPT SW by TONY MEDRANO
 */

const plotSine = ( ctx: any, width: number, height: number, wave: any, speed: number, stroke: any) => {
  ctx.save()
  
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.globalCompositeOperation='lighter'
  for (let i = 0; i < width; i++) {
    ctx.lineTo(i,wave.y + Math.sin(i * wave.length + speed) * wave.amplitude * Math.sin(speed))
  }
  
  ctx.strokeStyle = `hsl(${Math.abs(stroke.h * Math.sin(speed))}, ${stroke.s}%, ${stroke.l}%)`
  ctx.stroke()
  ctx.restore()
}

const run = (
  ctx: any,
  width: number,
  height: number,
  wave: any,
  speed: number,
  stroke: string
) => {
  plotSine(ctx, width, height, wave, speed, stroke)
}

export const sinewave = {
  run
}
