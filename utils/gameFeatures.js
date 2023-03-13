/**
 * Returns the sum of a random int between 0 and max plus a random int between 0 and base.
 * @param {Number} max 
 * @param {Number} base 
 * @returns {Number} randomizedResult
 */

exports.randomize = (max, base) => {
    console.log(max, base);
    return Math.floor(Math.random() * (max + 1)) + Math.floor(Math.random() * (base + 1));
};