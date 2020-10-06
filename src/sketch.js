/**
 * Source cote at https://github.com/maximeperez1993/p5-face-matrix
 * Sketch at https://www.openprocessing.org/sketch/978568
 */



let matrix;
let img;

function preload() {
    img = loadImage('image.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    matrix = new Matrix();
}

function draw() {
    background(0);
    matrix.paint();
    matrix.draw(img);
}


function windowResized() {
    createCanvas(windowWidth, windowHeight);
    matrix = new Matrix();
}

