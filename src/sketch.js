const charSize = 20;

let matrix;
let image;

function preload() {
    image = loadImage('image.jpg');
}


function setup() {
    createCanvas(innerWidth, innerHeight);
    textFont('Helvetica', charSize);
    pixelDensity(1);
    matrix = new Matrix();
}

function draw() {
    background(0);

    matrix.paint(image);
    matrix.draw();
}

