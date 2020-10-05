const columnProperties = {
    charSize: 20,
    speed: {min: 1, max: 2},
    length: {min: 3, max: 15},
    charset: initCharset(31, 126)
}

class Matrix {
    constructor() {
        this.columns = [];
        this.pixelSet = new Set();

        this.maxElements = (width / columnProperties.charSize) - 1;
    }

    paint(image) {

        if (random() < 0.05) {
            let x = round(random(this.maxElements)) * columnProperties.charSize;
            let column = this.columns.find(column => column.vector.x === x);
            console.log(this.columns);
            if (column == null) {
                this.columns.push(new Column(x, columnProperties));
            }

        }

        this.columns.forEach(column => this.fillSet(column.getHead()));
        this.applyImage(image);
    }

    draw() {
        textFont('Helvetica', charSize);
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.map(column => column.reset());
    }

    fillSet(vector) {
        for (let x = 0; x < charSize; x++) {
            for (let y = 0; y < charSize; y++) {
                if (random() > 0.5) continue;
                let newX = vector.x + x;
                let newY = vector.y + y;
                if (newX >= image.width || newY >= image.height) continue;
                this.pixelSet.add({x: newX, y: newY});
            }
        }
    }

    applyImage(image) {
        image.loadPixels();
        loadPixels();
        for (let item of this.pixelSet) {
            let x = item.x + (width / 2 - image.width / 2);
            let y = item.y + (height / 2 - image.height / 2);
            let index = (x + (y * width)) * 4;
            let imageIndex = (item.x + (item.y * image.width)) * 4;
            pixels[index] = image.pixels[imageIndex] / 2;
            pixels[index + 1] = image.pixels[imageIndex + 1];
            pixels[index + 2] = image.pixels[imageIndex + 2] / 2;
            pixels[index + 3] = image.pixels[imageIndex + 3];
        }
        updatePixels();
    }
}

function initCharset(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}