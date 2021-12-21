/**
 *  Flattening an multiple nested array function
 */
function flatArray(array) {
    // Reduce array
    return array.reduce((arr, item) => {
        // Do recursion and decompose to concat array if item is a type of array, otherwise push to flattened array
        Array.isArray(item) ? arr.push(...flatArray(item)) : arr.push(item);
        // Return reduced array
        return arr;
    }, []);
}

module.exports = flatArray;