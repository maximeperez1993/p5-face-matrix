/**
 * Source cote at https://github.com/maximeperez1993/p5-face-matrix
 * Sketch at https://www.openprocessing.org/sketch/978568
 */

const charSize = 15;

let matrix;
let img;

function preload() {
    img = loadImage('image.jpg');
}

function setup() {
    //createCanvas(innerWidth / 2, innerHeight);
    createCanvas(windowWidth, windowHeight);
    textFont('Helvetica', charSize);
    pixelDensity(1);
    matrix = new Matrix();
}

function draw() {
    background(0);
    matrix.paint(img);
    matrix.draw();
}

