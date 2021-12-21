// In TypeScript I would prefer to do the node as Abstract class to be sure that we are using proper composition
const AbstractNode = (operator, left, right) => {
    const result = function () {
        return operator.operation(left, right);
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