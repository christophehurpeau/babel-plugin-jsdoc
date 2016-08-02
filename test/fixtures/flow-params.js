exports.actual = `
function doStuff(
    arg1: string,
    arg2: number,
    arg3: boolean,
    arg4: mixed,
    arg5: Array<string>,
    arg6: Class<SomeOtherClass>,
    arg7: Function,
    arg8: Map<string, number>,
    arg9: Set<string>,
    arg10: Promise<string>,
    arg11: ?any,
    arg12: ?number,
    arg13: number = 0,
    arg14: string = 'test',
    arg15: string|number = ''
): string {}
`;

exports.expected = `
/**
 * @param {string} arg1
 * @param {number} arg2
 * @param {boolean} arg3
 * @param {*} arg4
 * @param {Array.<string>} arg5
 * @param {Function} arg6
 * @param {Function} arg7
 * @param {Map.<string, number>} arg8
 * @param {Set.<string>} arg9
 * @param {Promise.<string>} arg10
 * @param {*} [arg11]
 * @param {number} [arg12]
 * @param {number} [arg13=0]
 * @param {string} [arg14=test]
 * @param {(string|number)} [arg15=]
 * @returns {string}
*/ function doStuff(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13 = 0, arg14 = 'test', arg15 = '') {}
`;
