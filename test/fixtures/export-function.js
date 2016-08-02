exports.actual = `
/**
 * Do stuff
 */
export default function doStuff(i: number) {}
`;

exports.expected = `
/**
 * Do stuff
 * @param {number} i
*/
export default function doStuff(i) {}
`;
