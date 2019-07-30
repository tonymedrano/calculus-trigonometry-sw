/*
 * Filename: /Users/tonymedrano/Desktop/calculus-trigonometry-test/src/utils/monitor.ts
 * Path: /Users/tonymedrano/Desktop/calculus-trigonometry-test
 * Created Date: Friday, May 10th 2019, 9:29:51 am
 * Author: tonymedrano
 * 
 * Copyright (c) 2019 CALCULUS TYPESCRIPT PHYSICS by TONY MEDRANO
 */


const general = (ctx: any, options: any) => {
    const textLeft = 20
    ctx.save()
    ctx.font = '20px Consolas'
    ctx.fillText('Ceneral Setting: ', textLeft, 40)
    ctx.fillText('-----------------', textLeft, 55)
    ctx.fillText('centerX: ' + options.centerX, textLeft, 80)
    ctx.fillText('centerY: ' + options.centerY, textLeft, 100)
    ctx.fillText('angle: ' + options.angle, textLeft, 120)
    ctx.fillText('radius: ' + options.radius, textLeft, 140)
    ctx.fillText(`pos1: x = ${options.pos.x},  y = ${options.pos.y}`, textLeft, 160)
    ctx.fillText(`pos2: x = ${options.pos2.x},  y = ${options.pos2.y}`, textLeft, 180)
    ctx.fillText('ctx: ' + options.setting.tc, textLeft, 200)
    ctx.restore()
}

const tangent = (ctx: any, setting: any) => {
    const textLeft = 20
    ctx.save()
    ctx.font = '20px Consolas'
    ctx.fillText('Tangent Line: ', textLeft, 240)
    ctx.fillText('-----------------', textLeft, 255)
    ctx.fillText('x: ' + setting.x, textLeft, 280)
    ctx.fillText('y: ' + setting.y, textLeft, 300)
    ctx.fillText('dx: ' + setting.dx, textLeft, 320)
    ctx.fillText('dy: ' + setting.dy, textLeft, 340)
    ctx.fillText('m: ' + setting.m, textLeft, 360)
    ctx.fillText('perp m: ' + setting.perpM, textLeft, 380)
    ctx.fillText('ctx: ' + setting.tc, textLeft, 400)
    ctx.restore()
}

export const monitor = {
    general,
    tangent
}