const columnProperties = {
    charSize: {min: 8, max: 19},
    speed: {min: 6, max: 10},
    length: {min: 3, max: 50},
    charset: initCharset([31, 126], [23500, 23550])
}
const charSize = columnProperties.charSize.max;

class Matrix {
    constructor(image) {
        this.columns = [];
        this.pixels = [];
        this.pixelsMark = [];

        this.maxElements = (width / charSize) - 1;

        image.loadPixels();
        this.imagePixels = image.pixels;
        this.countMax = 0;
    }

    paint(skm, image) {
        this.countIter = 0;

        skm.loadPixels();
        this.columns
            .filter(column => column.shouldDecrypt)
            .filter(column => column.isOnColumn)
            .slice(0, max(this.columns.length, 10))
            .forEach(column => this.fillSet(column.getHead(), skm, image));
        skm.updatePixels();

        if (this.countMax < this.countIter) {
            this.countMax = this.countIter;
            //console.log(this.countIter);
        }

    }


    fillSet(vector, skm, image) {
        let probabilityToAdd = (frameCount + 1) / 1000;
        if (this.countIter > 1000) return;
        for (let x = 0; x < charSize; x++) {
            for (let y = 0; y < charSize; y++) {
                if (random() > probabilityToAdd) continue;
                let newX = vector.x + x;
                let newY = vector.y + y;

                if (newX >= img.width || newY >= img.height) continue;
                this.addPixel(skm, newX, newY, image);
                this.countIter++;
            }
        }
    }

    addPixel(skm, x, y, image) {
        if (!this.pixelsMark[x + ',' + y]) {
            this.pixelsMark[x + ',' + y] = true;

            let index = (x + (y * width)) * 4;
            let imageIndex = (x + (y * image.width)) * 4;

            skm.pixels[index] = this.imagePixels[imageIndex] / 2;
            skm.pixels[index + 1] = this.imagePixels[imageIndex + 1];
            skm.pixels[index + 2] = this.imagePixels[imageIndex + 2] / 2;
            skm.pixels[index + 3] = this.imagePixels[imageIndex + 3];
        }
    }

    draw() {
        if (width / 2 > img.width) {
            this.addColumn(this.maxElements / 2, 0);
            this.addColumn(this.maxElements / 3, 0);
        } else {
            this.addColumn(this.maxElements, 0);
        }
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.filter(column => !column.shouldReset());
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
}

function initCharset(...intervals) {
    return intervals.flatMap(interval => initCharsetInteval(interval[0], interval[1]));
}

function initCharsetInteval(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}