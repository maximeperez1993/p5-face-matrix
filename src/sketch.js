/**
 * Source cote at https://github.com/maximeperez1993/p5-face-matrix
 * Sketch at https://www.openprocessing.org/sketch/978568
 */

let matrix;
let img;

const s = skm => {

    skm.setup = function () {
        let canvas = skm.createCanvas(windowWidth, windowHeight);
        canvas.position(0, 0);
        skm.pixelDensity(1);
        skm.background(0);
    };

    skm.draw = function () {
        matrix.paint(skm, img);
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
    canvas.position(0, 0);
    matrix = new Matrix(img);

}

function draw() {
    clear();
    if (matrix != null) {
        matrix.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    matrix = new Matrix(img);
}

