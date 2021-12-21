const Node = require('./task2.js');

describe('(Task 2) Binary Tree', () => {
    const tree = Node(
        "÷",
        null,
        Node(
            "+",
            null,
            Node("", 7, null, null),
            Node(
                "x",
                null,
                Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
                Node("", 5, null, null)
            )
        ),
        Node("", 6, null, null)
    );

    test('First assertion', () => {
        expect(tree.toString()).toStrictEqual("((7 + ((3 - 2) x 5)) ÷ 6)");
    });
    test('Second assertion', () => {
        expect(tree.result()).toStrictEqual(2);
    });
});