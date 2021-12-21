const flatArray = require('./task1.js');

describe('(Task 1) Flattening array', () => {
    test('When [ 1, [ 2, [ 3 ] ], 4 ] given, returns [ 1, 2, 3, 4 ]', () => {
        const nestedArray = [ 1, [ 2, [ 3 ] ], 4 ];
        expect(flatArray(nestedArray)).toStrictEqual([ 1, 2, 3, 4 ]);
    });
    test('When [ 1, [ 2, [ 3, 4 ] ], 4, 5 ] given, returns [ 1, 2, 3, 4, 4, 5 ]', () => {
        const nestedArray = [ 1, [ 2, [ 3, 4 ] ], 4, 5 ];
        expect(flatArray(nestedArray)).toStrictEqual([ 1, 2, 3, 4, 4, 5 ]);
    });
    test('When array with string [ 1, [ \'some string\', [ 3, 4 ] ], 4, 5 ]  given, returns [ 1, \'some string\', 3, 4, 4, 5 ]', () => {
        const nestedArray = [ 1, [ 'some string', [ 3, 4 ] ], 4, 5 ];
        expect(flatArray(nestedArray)).toStrictEqual([ 1, 'some string', 3, 4, 4, 5 ]);
    });
    test('When edge case with one element [ 1 ] given, returns [ 1 ]', () => {
        const nestedArray = [ 1 ];
        expect(flatArray(nestedArray)).toStrictEqual([ 1 ]);
    });
    test('When edge case empty array [ ] given, returns [ ]', () => {
        const nestedArray = [ ];
        expect(flatArray(nestedArray)).toStrictEqual([ ]);
    });
    test('When non array is given, returns [ ]', () => {
        const nestedArray = [ ];
        expect(flatArray('string')).toStrictEqual([ ]);
        expect(flatArray(1)).toStrictEqual([ ]);
        expect(flatArray({})).toStrictEqual([ ]);
    });
});