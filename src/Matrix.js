const columnProperties = {
    charSize: 15,
    speed: {min: 6, max: 10},
    length: {min: 3, max: 50},
    charset: initCharset([31, 126], [23500, 23550])
}

class Matrix {
    constructor() {
        this.columns = [];
        this.pixels = [];
        this.pixelsMark = [];

        this.maxElements = (width / columnProperties.charSize) - 1;

        this.margX = (width / 2 - image.width / 2);
        this.margY = (height / 2 - image.height / 2);

        this.imageRight = width / 2 + image.width / 2;
        this.imageLeft = width / 2 - image.width / 2;
        this.imageBottom = height / 2 + image.height / 2;
        this.imageTop = height / 2 - image.height / 2;

        image.loadPixels();
        this.imagePixels = image.pixels;
        this.maxPixels = image.width * image.height;
        this.maxPixelsToDraw = 0.93 * this.maxPixels;
    }

    paint(image) {
        this.addColumn(this.maxElements);

        this.columns.forEach(column => this.fillSet(column.getHead()));
        this.applyImage(image);
    }

    addColumn(max) {


        let x = round(random(max)) * columnProperties.charSize;
        let probability = this.isOnColImage(x) ? 0.5 : 0.9;
        if (random() < probability) return;


        let shouldBlockNextColumn = this.columns.some(column => column.shouldBlockNextColumn(x));
        if (!shouldBlockNextColumn) {
            this.columns.push(new Column(x, columnProperties));
        }
    }

    draw() {
        textFont('Helvetica', charSize);
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.filter(column => !column.shouldReset());
    }

    fillSet(vector) {

        if (this.pixels.length === this.maxPixelsToDraw) return;

        if (vector.x < this.imageLeft || vector.x >= this.imageRight ||
            vector.y < this.imageTop || vector.y >= this.imageBottom) return;

        let probabilityToAdd = (sqrt(this.pixels.length + 1) * 2.3) / 1000;
        for (let x = 0; x < charSize; x++) {
            for (let y = 0; y < charSize; y++) {
                if (random() > probabilityToAdd) continue;
                let newX = vector.x + x;
                let newY = vector.y + y;

                if (newX < this.imageLeft || newX >= this.imageRight ||
                    newY < this.imageTop || newY >= this.imageBottom) continue;
                this.addPixel(newX, newY);
            }
        }
    }

    addPixel(x, y) {
        if (!this.pixelsMark[x + ',' + y]) {
            this.pixelsMark[x + ',' + y] = true;
            this.pixels.push({x: x, y: y});
        }
    }

    applyImage(image) {
        loadPixels();
        for (let item of this.pixels) {
            if (item.global == null) {
                let index = (item.x + (item.y * width)) * 4;
                let imageX = item.x - this.margX;
                let imageY = item.y - this.margY;
                let imageIndex = (imageX + (imageY * image.width)) * 4;
                item.global = {index: index};
                item.image = {index: imageIndex};
            }
            pixels[item.global.index] = this.imagePixels[item.image.index] / 2;
            pixels[item.global.index + 1] = this.imagePixels[item.image.index + 1];
            pixels[item.global.index + 2] = this.imagePixels[item.image.index + 2] / 2;
            pixels[item.global.index + 3] = this.imagePixels[item.image.index + 3];
        }
        updatePixels();
    }

    isOnColImage(x) {
        let imageRight = (width / 2 - image.width / 2) + image.width;
        let imageLeft = (width / 2 - image.width / 2);
        return x >= imageLeft && x < imageRight;
    }
}

function initCharset(...intervals) {
    return intervals.flatMap(interval => initCharsetInteval(interval[0], interval[1]));
}

function initCharsetInteval(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}