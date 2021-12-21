// In TypeScript I would prefer to do the node as Abstract class to be sure that we are using proper composition
class AbstractNode {
    constructor(operator, left, right) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    valueOf() {
        return this.operator.operation(this.left, this.right);
    };

    toString() {
        return `(${this.left.toString()} ${this.operator.textRepresentation} ${this.right.toString()})`;
    };

    result() {
        return this.valueOf();
    }
}

const NodeFactory = (operationType, left, right) => {
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

    switch (operationType) {
        case "+":
            return new AbstractNode(addOperator, left, right);
        case "-":
            return new AbstractNode(subOperator, left, right);
        case "÷":
            return new AbstractNode(divOperator, left, right);
        case "x":
            return new AbstractNode(mulOperator, left, right);
        default:
            // TODO Throw exception?
    }
}

module.exports = {
    NodeFactory
};