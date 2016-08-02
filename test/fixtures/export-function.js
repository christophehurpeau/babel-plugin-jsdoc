exports.actual = `
/**
 * Do stuff
 */
export default function doStuff(i: number) {}


/**
 * Do other stuff
 */
export function doOtherStuff(s: string): number {}

`;

exports.expected = `
/**
 * Do stuff
 * @param {number} i
*/
export default function doStuff(i) {}

/**
 * Do other stuff
 * @param {string} s
 * @returns {number}
*/
export function doOtherStuff(s) {}
`;
