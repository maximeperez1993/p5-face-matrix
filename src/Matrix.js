
const columnProperties = {
    charSize: {min: 8, max: 19},
    speed: {min: 6, max: 10},
    length: {min: 3, max: 50},
    charset: initCharset([31, 126], [23500, 23550])
}
const charSize = columnProperties.charSize.max;

class Matrix {
    constructor() {
        this.columns = [];
        this.pixels = [];
        this.pixelsMark = [];

        this.maxElements = (width / charSize) - 1;

        img.loadPixels();
        this.imagePixels = img.pixels;
        this.maxPixels = img.width * img.height;
    }

    paint() {
        this.addColumn(this.maxElements / 2, 0);
        this.addColumn(this.maxElements / 3, 0);

        if (this.pixels.length !== this.maxPixels) {
            this.columns.forEach(column => this.fillSet(column.getHead()));
        }
    }

    addColumn(max, margin) {
        let x = round(random(max) + margin) * charSize;
        let probabilityToAdd = 0.3;
        if (random() > probabilityToAdd) return;

        let shouldBlockNextColumn = this.columns.some(column => column.shouldBlockNextColumn(x));
        if (!shouldBlockNextColumn) {
            this.columns.push(new Column(x, columnProperties));
        }
    }

    fillSet(vector) {
        if (vector.x >= img.width || vector.y >= img.height) return;

        let probabilityToAdd = (sqrt(this.pixels.length + 1) * 3) / 1000;
        for (let x = 0; x < charSize; x++) {
            for (let y = 0; y < charSize; y++) {
                if (random() > probabilityToAdd) continue;
                let newX = vector.x + x;
                let newY = vector.y + y;

                if (newX >= img.width || newY >= img.height) continue;
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

    draw(image) {
        this.applyImage(image);
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.filter(column => !column.shouldReset());
    }

    applyImage(image) {
        loadPixels();
        for (let item of this.pixels) {
            if (item.global == null) {
                let index = (item.x + (item.y * width)) * 4;
                let imageX = item.x;
                let imageY = item.y;
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
        let imageRight = (width / 2 - img.width / 2) + img.width;
        let imageLeft = (width / 2 - img.width / 2);
        return x >= imageLeft && x < imageRight;
    }
}

function initCharset(...intervals) {
    return intervals.flatMap(interval => initCharsetInteval(interval[0], interval[1]));
}

function initCharsetInteval(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}