const Node = (operator, value, left, right) => {
    const operatorsDict = {
        '+': '+',
        '-': '-',
        'x': '*',
        '÷': '/',
    };

    const result = function () {
        if(operatorsDict[this.operator] !== undefined) {
            return eval('left.result()' + operatorsDict[this.operator] + 'right.result()');
        } else {
            return value;
        }
    };

    const toString = function () {
        if(operatorsDict[this.operator] !== undefined) {
            return `(${left.toString()} ${this.operator} ${right.toString()})`;
        } else {
            return value.toString();
        }
    };

    return {
        operator,
        value,
        left,
        right,
        result,
        toString
    };
};

module.exports = Node;