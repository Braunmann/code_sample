/**
 *  Flattening an multiple nested array function
 */
function flatArray(arr) {
    // Create empty array where flattened data will be pushed
    const flattenedArray = [];

    // Iterate through whole array using classic 'for' loop
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        // Check if item is an array
        if (Array.isArray(item)) {
            // If so, call the recursion
            const recursionResults = flatArray(item);
            // Decompose and push to 'flattenedArray'
            flattenedArray.push(...recursionResults);
        } else {
            // If not pass element to flattenArray
            flattenedArray.push(item);
        }
    };

    return flattenedArray;
}

module.exports = flatArray;