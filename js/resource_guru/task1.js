/**
 *  Flattening an multiple nested array function
 */
const flatArray = array => array.reduce((arr, item) =>
    Array.isArray(item) ? arr.concat(flatArray(item)) : arr.concat([item])
, []);

module.exports = flatArray;