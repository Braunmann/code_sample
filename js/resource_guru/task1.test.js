const flatArray = require('./task1.js');

describe('Test suite for task 1', () => {
    test('[ 1, [ 2, [ 3 ] ], 4 ] -> [ 1, 2, 3, 4 ]', () => {
        const nestedArray = [ 1, [ 2, [ 3 ] ], 4 ];
        expect(flatArray(nestedArray)).toStrictEqual([ 1, 2, 3, 4 ]);
    });
});