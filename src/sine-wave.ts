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

const plotAudio = (ctx: any, width: any, height: any, wave: any, amplitude: any, strokeColor: any, speed: any) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < (amplitude.length); i++) {
    let value = amplitude[i] / 256;
    let y = width - height * value - 1;
    ctx.lineTo(i, (y-wave.y) + Math.sin(i * (amplitude.length + wave.length) + speed) * wave.amplitude * Math.sin(speed))
  }
  
  ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(speed))}, ${strokeColor.s}%, ${strokeColor.l}%)`
  ctx.stroke()
  ctx.restore()
};

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

const sound = (
  ctx: any, width: any, height: any, wave: any, amplitude: any, strokeColor: any,speed: number) => {
  plotAudio(ctx, width, height, wave, amplitude, strokeColor, speed)
}

export const sinewave = {
  run,
  sound
}
