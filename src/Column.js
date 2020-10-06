class Column {

    /**
     * properties = {
     *  charSize,
     *  speed: {min, max},
     *  length: {min, max},
     *  charset
     * }
     */
    constructor(x, properties) {
        this.charset = properties.charset;
        this.charSize = initRange(properties.charSize);
        this.length = initRange(properties.length) - 1;
        this.chars = Array(this.length).fill(random(this.charset));
        this.headChar = random(this.charset);

        this.vector = createVector(x, -this.length);
        this.speed = max(round(10 / initRange(properties.speed)), 1);

        this.charColor = color(60, 190, 60);
        this.headCharColor = color(230, 255, 230);
    }

    getHead() {
        return createVector(this.vector.x, (this.vector.y + this.length) * this.charSize);
    }

    draw() {
        textFont('Helvetica', this.charSize);
        this.scroll();
        this.drawChars();
        this.drawHeadChar();
    }

    scroll() {
        if (frameCount % this.speed !== 0) {
            return;
        }
        this.vector.y++;
        this.chars.push(this.headChar);
        this.chars.shift()
        this.headChar = random(this.charset);
    }

    drawChars() {
        fill(this.charColor);
        stroke(this.charColor);
        this.chars.forEach((char, i) => this.text(char, i));
    }

    drawHeadChar() {
        fill(this.headCharColor);
        stroke(this.headCharColor);
        this.text(this.headChar, this.length);
    }

    text(char, index) {
        text(char, this.vector.x, this.calcY(index));
    }

    calcY(index) {
        return (this.vector.y + index) * this.charSize;
    }

    shouldReset() {
        return this.vector.y * this.charSize > height;
    }

    shouldBlockNextColumn(x) {
        return this.vector.x === x;
    }
}

function initRange(interval) {
    return round(random(interval.min, interval.max));
}
