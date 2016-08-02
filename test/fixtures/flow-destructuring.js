exports.actual = `
function simpleObjectDestructuring({ foo, bar }: { foo: string, bar: number }) {}

function destructuringInDestructuring({ foo, bar: { bar1, bar2 } }: { foo: string, bar: { bar1: number }}) {}

function simpleArrayDestructuring([foo, bar]: [string, number]) {}
`;

exports.expected = `
 /**
 * @param {Object} param1
 * @param {string} param1.foo
 * @param {number} param1.bar
*/ function simpleObjectDestructuring({ foo, bar }) {}

/**
 * @param {Object} param1
 * @param {string} param1.foo
 * @param {Object} param1.bar
 * @param {number} param1.bar.bar1
*/ function destructuringInDestructuring({ foo, bar: { bar1, bar2 } }) {}

/**
 * @param {Array.<*>} param1
*/ function simpleArrayDestructuring([foo, bar]) {}
`;
