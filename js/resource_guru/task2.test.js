const { NodeFactory } = require('./task2.js');

describe('(Task 2) Binary Tree', () => {
    describe('Node add 1 + 3 = 4', () => {
        const node = NodeFactory("+", 1, 3);

        test('Should be presented as (1 + 3)', () => {
            expect(node.toString()).toStrictEqual("(1 + 3)");
        });
        test('Should equal 4 ', () => {
            expect(node.result()).toStrictEqual(4);
        });
    });

    describe('Node sub 3 - 1 = 2 ', () => {
        const node = NodeFactory("-", 3, 1);
        test('Should be presented as (3 - 1)', () => {
            expect(node.toString()).toStrictEqual("(3 - 1)");
        });
        test('Should equal 2 ', () => {
            expect(node.result()).toStrictEqual(2);
        });
    });

    describe('Node div 9 / 3 = 3 ', () => {
        const node = NodeFactory("÷", 9, 3);
        test('Should be presented as (9 ÷ 3)', () => {
            expect(node.toString()).toStrictEqual("(9 ÷ 3)");
        });
        test('Should equal 3 ', () => {
            expect(node.result()).toStrictEqual(3);
        });
    });

    describe('Node mul 4 * 3 = 12', () => {
        const node = NodeFactory("x", 4, 3);
        test('Should be presented as (4 x 3)', () => {
            expect(node.toString()).toStrictEqual("(4 x 3)");
        });
        test('Should equal 12', () => {
            expect(node.result()).toStrictEqual(12);
        });
    });

    describe('Node addition integer to another node 1 + (3 + 4) = 12', () => {
        const tree = NodeFactory("+", 1, NodeFactory("+", 3, 4));
        test('Should be presented as (1 + (3 + 4))', () => {
            expect(tree.toString()).toStrictEqual("(1 + (3 + 4))");
        });
        test('Should equal 8', () => {
            expect(tree.result()).toStrictEqual(8);
        });
    });

    const tree = NodeFactory(
        "÷",
        NodeFactory(
            "+",
            7,
            NodeFactory(
                "x",
                NodeFactory("-",  3, 2),
                5
            )
        ),
        6
    );

    test('First assertion', () => {
        expect(tree.toString()).toStrictEqual("((7 + ((3 - 2) x 5)) ÷ 6)");
    });
    test('Second assertion', () => {
        expect(tree.result()).toStrictEqual(2);
    });
});