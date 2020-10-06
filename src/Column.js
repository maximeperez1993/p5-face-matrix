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
        this.length = initRange(properties.length) - 1;
        this.chars = Array(this.length).fill(random(this.charset));
        this.headChar = random(this.charset);

        this.vector = createVector(x, -this.length);
        this.speed = max(round(10 / initRange(properties.speed)), 1);

        this.charColor = color(60, 190, 60);
        this.headCharColor = color(255, 255, 255);
    }

    getHead() {
        return createVector(this.vector.x, (this.vector.y + this.length) * charSize);
    }

    draw() {
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
        stroke(this.charColor);
        this.text(this.headChar, this.length);
    }

    text(char, index) {
        text(char, this.vector.x, this.calcY(index));
    }

    calcY(index) {
        return (this.vector.y + index) * charSize;
    }

    shouldReset() {
        return this.vector.y * charSize > height;
    }

    shouldBlockNextColumn(x) {
        return this.vector.x === x;
    }
}

function initRange(interval) {
    return round(random(interval.min, interval.max));
}
