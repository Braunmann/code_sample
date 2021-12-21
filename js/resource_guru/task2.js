const Node = (operator, value, left, right) => {
    const result = function () {
        switch (this.operator) {
            case "+":
                return left.result() + right.result();
            case "-":
                return left.result() - right.result();
            case "x":
                return left.result() * right.result();
            case "÷":
                return left.result() / right.result();
            default:
                return value;
        }
    };

    const toString = function () {
        switch (this.operator) {
            case "+":
                return `(${left.toString()} + ${right.toString()})`;
            case "-":
                return `(${left.toString()} - ${right.toString()})`;
            case "x":
                return `(${left.toString()} x ${right.toString()})`;
            case "÷":
                return `(${left.toString()} ÷ ${right.toString()})`;
            default:
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