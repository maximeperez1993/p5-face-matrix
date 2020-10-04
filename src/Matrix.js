const columnProperties = {
    charSize : 20,
    speed: {min: 1, max: 7},
    length: {min: 3, max: 15},
    charset: initCharset(31, 126)
}

class Matrix {
    constructor() {
        this.columns = [];
        let nbElements = (width / columnProperties.charSize) - 1;
        for (let i = 0; i < nbElements; i++) {
            this.columns[i] = new Column(i * columnProperties.charSize, columnProperties);
        }
    }

    draw() {
        textFont('Helvetica', charSize);
        this.columns.forEach(column => column.draw());
        this.columns = this.columns.map(string => string.reset());
    }
}

function initCharset(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => String.fromCharCode(start + idx));
}