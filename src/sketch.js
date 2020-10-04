const charSize = 20;

let matrix;

function setup() {
    createCanvas(displayWidth, displayHeight);
    textFont('Helvetica', charSize);
    matrix = new Matrix();
}

function draw() {
    background(0);
    matrix.draw();
}

