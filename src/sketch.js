/**
 * Source cote at https://github.com/maximeperez1993/p5-face-matrix
 * Sketch at https://www.openprocessing.org/sketch/978568
 */

let matrix;
let img;

let canvasPosition;

const s = skm => {

    skm.setup = function () {
        let canvas = skm.createCanvas(windowWidth, windowHeight);
        canvasPosition = canvas.position();
        skm.pixelDensity(1);
        skm.background(0);
    };

    skm.draw = function () {
        if (matrix != null) {
            matrix.paint(skm, img);
        }
    };

    skm.windowResized = function () {
        skm.resizeCanvas(windowWidth, windowHeight);
        skm.pixelDensity(1);
    };
};

new p5(s);

function preload() {
    img = loadImage('image.jpg');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(canvasPosition.x, canvasPosition.y);
    matrix = new Matrix(img);
}

function draw() {
    clear();
    matrix.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    matrix = new Matrix(img);
}

