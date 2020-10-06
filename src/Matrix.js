const columnProperties = {
    charSize: 15,
    speed: {min: 5, max: 20},
    length: {min: 3, max: 15},
    charset: initCharset(31, 126)
}

class Matrix {
    constructor() {
        this.columns = [];
        this.pixels = [];
        this.pixelsMark = [];

        this.maxElements = (width / columnProperties.charSize) - 1;
    }

    paint(image) {
        let x = round(random(this.maxElements)) * columnProperties.charSize;
        let column = this.columns.find(column => column.vector.x === x);
        if (column == null && random() < frameCount / 2000) {
            this.columns.push(new Column(x, columnProperties));
        }

        this.columns.forEach(column => this.fillSet(column.getHead()));
        this.applyImage(image);
    }

    draw() {
        textFont('Helvetica', charSize);
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.filter(column => !column.shouldReset());
    }

    fillSet(vector) {
        let probability = 1 - (sqrt(this.pixels.length + 1) * 2) / 1000;
        for (let x = 0; x < charSize; x++) {
            for (let y = 0; y < charSize; y++) {
                if (random() < probability) continue;
                let newX = vector.x + x;
                let newY = vector.y + y;
                let imageRight = (width / 2 - image.width / 2) + image.width;
                let imageLeft = (width / 2 - image.width / 2);
                let imageBottom = (height / 2 - image.height / 2) + image.height;
                let imageTop = (height / 2 - image.height / 2);

                if (newX < imageLeft || newX >= imageRight || newY < imageTop || newY >= imageBottom) continue;
                this.addPixel(newX, newY);
            }
        }
    }

    addPixel(x, y) {
        if (!this.pixelsMark[x + ',' + y]) {
            this.pixels.push({x: x, y: y});
            this.pixelsMark[x + ',' + y] = true;
        }
    }

    applyImage(image) {
        image.loadPixels();
        loadPixels();
        for (let item of this.pixels) {
            let x = item.x - (width / 2 - image.width / 2);
            let y = item.y - (height / 2 - image.height / 2);
            let index = (item.x + (item.y * width)) * 4;
            let imageIndex = (x + (y * image.width)) * 4;

            pixels[index] = image.pixels[imageIndex] / 2;
            pixels[index + 1] = image.pixels[imageIndex + 1];
            pixels[index + 2] = image.pixels[imageIndex + 2] / 2;
            pixels[index + 3] = image.pixels[imageIndex + 3];
        }
        updatePixels();
    }

    isOnColImage(x) {
        let imageRight = (width / 2 - image.width / 2) + image.width;
        let imageLeft = (width / 2 - image.width / 2);
        return x >= imageLeft && x < imageRight;
    }
}

function initCharset(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}