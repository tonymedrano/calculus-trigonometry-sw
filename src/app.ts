/*
 * File: /Users/tonymedrano/Desktop/calculus-trigonometry-sw/src/app.ts
 * Project: /Users/tonymedrano/Desktop/calculus-trigonometry-sw
 * Created Date: Thursday May 9th 2019
 * Author: tonymedrano
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2019 CALCULUS TYPESCRIPT SW by TONY MEDRANO
 */
import { GUI } from "dat.gui"

import {
  getRandomColor,
  colors,
  math,
  easing,
  base,
  background,
  monitor
} from "./utils"
import { sinewave } from "./sine-wave";

//import { sinewave } from "./sine-wave"

//. Create element --->
const canvas: HTMLCanvasElement = document.createElement("canvas")
canvas.id = "calculus-trigonometry"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

//. Create context ---->
const ctx: any = canvas.getContext("2d")
const width: number = canvas.width
const height: number = canvas.height

//. Settings ---->
const centerY: number = height * 0.5
const centerX: number = width * 0.5
const radius: number = centerX * 0.75
let speed: number = 0.01
let angle: number = 0

//. Dat.gui settings ----->
const gui = new GUI()

//. Sine waves initial settings ----->
const x: number = 4
const y: number = 0
const amplitude: number = 40
const frequency: number = 20

//. Sine waves settings ----->
const wave: any = {
  y: centerY,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const gridColor: any = {
  h: 200,
  s: 50,
  l: 50
}

const strokeColor: any = {
  h: 200,
  s: 50,
  l: 50
}

const backgroundColor: any = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
}

const waveController = gui.addFolder("wave")
waveController.add(wave, "y", 0, centerY)
waveController.add(wave, "length", -0.01, 0.01)
waveController.add(wave, "amplitude", -300, 300)
waveController.add(wave, "frequency", -0.01, 1)
waveController.open()

const strokeController = gui.addFolder("stroke")
strokeController.add(strokeColor, "h", 0, 255)
strokeController.add(strokeColor, "s", 0, 100)
strokeController.add(strokeColor, "l", 0, 100)
strokeController.open()

const backgroundController = gui.addFolder("background")
backgroundController.add(backgroundColor, "r", 0, 255)
backgroundController.add(backgroundColor, "g", 0, 255)
backgroundController.add(backgroundColor, "b", 0, 255)
backgroundController.add(backgroundColor, "a", 0, 1)
backgroundController.open()

const gridController = gui.addFolder("grid")
gridController.add(gridColor, "h", 0, 255)
gridController.add(gridColor, "s", 0, 100)
gridController.add(gridColor, "l", 0, 100)
gridController.open()


  
//. Render ---->
const _update = () => {
  //. Clear canvas ----->
//  base.clear(ctx, width, height)
  const grid = `hsl(${Math.abs(gridColor.h * Math.sin(speed))}, ${gridColor.s}%, ${gridColor.l}%)`
  
  background(ctx, 15, 45, grid, backgroundColor)

  sinewave.run(ctx,width, height, wave, speed, strokeColor) 
  speed += wave.frequency

  //. Update everything! ---->
 // angle += speed
  requestAnimationFrame(_update)
}
_update()
