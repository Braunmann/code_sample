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

    // The requirements are that assertion can not be change, we have to leave the result() method
    result() {
        return this.valueOf();
    }
}

const NodeFactory = (operationType, left, right) => {
    const operators = new Map();
    operators.set('+', (l, r) => l + r);
    operators.set('-', (l, r) => l - r);
    operators.set('x', (l, r) => l * r);
    operators.set('÷', (l, r) => l / r);

    // If operation in known
    if(operators.has(operationType)) {
        // Factory Node for operation
        const operator = {
            operation: operators.get(operationType),
            textRepresentation: operationType
        }
        return new AbstractNode(operator, left, right);
    }
    // Otherwise throw an exception
    throw new TypeError(`Invalid operationType "${operationType}"`)
}

module.exports = {
    NodeFactory
};