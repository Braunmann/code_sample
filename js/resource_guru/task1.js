/**
 *  Flattening an multiple nested array function
 */
const flatArray = array => !Array.isArray(array) ? [] : array.reduce((arr, item) =>
    [ ...arr, ...Array.isArray(item) ? flatArray(item) : [ item ] ]
, []);

module.exports = flatArray;