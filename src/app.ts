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
import { GUI } from "dat.gui";

import {
  getRandomColor,
  colors,
  math,
  easing,
  base,
  background,
  monitor
} from "./utils";
import { sinewave } from "./sine-wave";

//import { sinewave } from "./sine-wave"

//. Create element --->
const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.id = "calculus-trigonometry";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

//. Create context ---->
const ctx: any = canvas.getContext("2d");
const width: number = canvas.width;
const height: number = canvas.height;

//. Settings ---->
const centerY: number = height * 0.5;
const centerX: number = width * 0.5;
const radius: number = centerX * 0.75;
let speed: number = 0.01;
let angle: number = 0;

//. Dat.gui settings ----->
const gui: any = new GUI();

//. Sine waves initial settings ----->
const x: number = 4;
const y: number = 0;
const amplitude: number = 40;
const frequency: number = 20;

//. Sine waves settings ----->
const wave: any = {
  y: centerY,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
};

const gridColor: any = {
  h: 200,
  s: 50,
  l: 50
};

const strokeColor: any = {
  h: 200,
  s: 50,
  l: 50
};

const backgroundColor: any = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
};

//. Audio settings ----->
const options: any = {
  stop: () => stop(),
  start: () => start()
};

const waveController = gui.addFolder("wave");
waveController.add(wave, "y", 0, centerY);
waveController.add(wave, "length", -0.01, 0.01);
waveController.add(wave, "amplitude", -300, 300);
waveController.add(wave, "frequency", -0.01, 1);
waveController.open();

const strokeController = gui.addFolder("stroke");
strokeController.add(strokeColor, "h", 0, 255);
strokeController.add(strokeColor, "s", 0, 100);
strokeController.add(strokeColor, "l", 0, 100);
strokeController.open();

const backgroundController = gui.addFolder("background");
backgroundController.add(backgroundColor, "r", 0, 255);
backgroundController.add(backgroundColor, "g", 0, 255);
backgroundController.add(backgroundColor, "b", 0, 255);
backgroundController.add(backgroundColor, "a", 0, 1);
backgroundController.open();

const gridController = gui.addFolder("grid");
gridController.add(gridColor, "h", 0, 255);
gridController.add(gridColor, "s", 0, 100);
gridController.add(gridColor, "l", 0, 100);
gridController.open();

const musicController = gui.addFolder("music");
musicController.add(options, "stop");
musicController.add(options, "start");
musicController.open();

//. Global Variables for Audio ----->
let audioContext: any;
let sourceNode: any;
let analyserNode: any;
let javascriptNode: any;
let audioData: any = null;
let audioPlaying: boolean = false;
const sampleSize: number = 1024;
let amplitudeArray: any;
const audioUrl: string = './audio/smooth_criminal.mp3';

const setupAudioNodes = () => {
  sourceNode = audioContext.createBufferSource();
  analyserNode = audioContext.createAnalyser();
  javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
  amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
  sourceNode.connect(audioContext.destination);
  sourceNode.connect(analyserNode);
  analyserNode.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
};

//. Load the audio from the URL via Ajax and store it in global variable audioData ----->
//. Note that the audio load is asynchronous ----->
const loadSound = (url: any) => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  // When loaded, decode the data and play the sound
  request.onload = () => {
    audioContext.decodeAudioData(
      request.response,
      (buffer: any) => {
        audioData = buffer;
        playSound(audioData);
      },
      onError
    );
  };
  request.send();
};

//. Play the audio and loop until stopped ----->
const playSound = (buffer: any) => {
  sourceNode.buffer = buffer;
  sourceNode.start(0); // Play the sound now
  sourceNode.loop = true;
  audioPlaying = true;
};

const onError = (e: any) => {
  console.log(e);
};

try {
  audioContext = new AudioContext();
} catch (e) {
  alert("Web Audio API is not supported in this browser");
}

const start = () => {
  console.log("start...");
  setupAudioNodes();
  // setup the event handler that is triggered every time enough samples have been collected
  // trigger the audio analysis and draw the results
  javascriptNode.onaudioprocess = () => {
    // get the Time Domain data for this sample
    analyserNode.getByteTimeDomainData(amplitudeArray);
  };
  // Load the Audio the first time through, otherwise play it from the buffer
  if (audioData == null) {
    loadSound(audioUrl);
  } else {
    playSound(audioData);
  }
  audioPlaying = true;
};

const stop = () => {
  sourceNode.stop(0);
  audioPlaying = false;
};
//. Render ---->
const _update = () => {
  //. Clear canvas ----->
  //  base.clear(ctx, width, height)
  const grid = `hsl(${Math.abs(gridColor.h * Math.sin(speed))}, ${
    gridColor.s
  }%, ${gridColor.l}%)`;
  background(ctx, 15, 45, grid, backgroundColor);
  if (audioPlaying) {
    drawAudio(ctx, strokeColor);
  } else {

    sinewave.run(ctx, width, height, wave, speed, strokeColor);
  }

  //. Update everything! ---->
  // angle += speed
  speed += wave.frequency;
  requestAnimationFrame(_update);
};

const drawAudio = (ctx: any, fill: any) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < amplitudeArray.length; i++) {
    let value = amplitudeArray[i] / 256;
    let y = width - height * value - 1;
    ctx.lineTo(i, (y-wave.y) + Math.sin(i * (wave.length) + speed) * wave.amplitude * Math.sin(speed))
  }
  
  ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(speed))}, ${strokeColor.s}%, ${strokeColor.l}%)`
  ctx.stroke()
  ctx.restore()
};
_update();
