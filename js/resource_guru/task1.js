/**
 *  Flattening an multiple nested array function
 */
function flatArray(arr) {
    // Create empty array where flattened data will be pushed
    const flattenedArray = [];

    // Iterate through whole array using classic 'forEach' loop
    arr.forEach(item => {
        // Do recursion and decompose to concat array if item is a type of array, otherwise push to flattened array
        Array.isArray(item) ? flattenedArray.push(...flatArray(item)) : flattenedArray.push(item);
    });
    return flattenedArray;
}

module.exports = flatArray;