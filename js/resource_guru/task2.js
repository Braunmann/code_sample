// In TypeScript I would prefer to do the node as Abstract class to be sure that we are using proper composition
const AbstractNode = (operator, left, right) => {
    const isNode = n => typeof(n) === 'object' && n.left && n.right

    const result = function () {
        // Check both sides if it's node then call recursive to reduce to Number
        const l = isNode(left) ? left.result() : left,
              r = isNode(right) ? right.result() : right;

        return operator.operation(l, r);
    };

    const toString = function () {
        return `(${left.toString()} ${operator.textRepresentation} ${right.toString()})`;
    };

    return {
        operator,
        left,
        right,
        result,
        toString
    };
};

// In Type script will be good to create interface for the operators
const addOperator = {
    operation: (l, r) => l + r,
    textRepresentation: '+'
}
const subOperator = {
    operation: (l, r) => l - r,
    textRepresentation: '-'
}
const divOperator = {
    operation: (l, r) => l / r,
    textRepresentation: '÷'
}
const mulOperator = {
    operation: (l, r) => l * r,
    textRepresentation: 'x'
}

const NodeFactory = (operationType, left, right) => {
    switch (operationType) {
        case "+":
            return AbstractNode(addOperator, left, right);
        case "-":
            return AbstractNode(subOperator, left, right);
        case "÷":
            return AbstractNode(divOperator, left, right);
        case "x":
            return AbstractNode(mulOperator, left, right);
        default:
            // TODO Throw exception?
    }
}

module.exports = {
    NodeFactory
};