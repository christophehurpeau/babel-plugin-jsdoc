/* global test */
const fs = require('fs');
const babel = require('babel-core');
const { strictEqual } = require('assert');

const pluginPath = require.resolve('..');

const last = process.argv[process.argv.length - 1];
const tests = last !== 'test/index.js' ? [last]
    : fs.readdirSync(__dirname + '/fixtures').filter(name => name.endsWith('.js'));

const options = {
    presets: [], // TODO preset jsdoc
    plugins: [
        "syntax-flow",
        "transform-class-constructor-call",
        "transform-class-properties",
        "transform-flow-strip-types"
    ],
};

function normalizeLines(str) {
    return str.trim().replace(/\*\/[ ]*/g,'*/ ').replace(/[ \t]*\r?\n/g, '\n');
}

tests.forEach(filename => {
    const testContent = require(__dirname + '/fixtures/' + filename);

    test(testContent.name || filename, () => {
        try {
            const output = babel.transform(testContent.actual, {
                babelrc: false,
                presets: options.presets,
                plugins: options.plugins.concat([pluginPath]),
            });

            const actual = normalizeLines(output.code);
            const expected = normalizeLines(testContent.expected);

            strictEqual(actual, expected);
        } catch (err) {
            if (err._babel && err instanceof SyntaxError) {
                console.log(`Unexpected error in test: ${test.name || filename}`);
                console.log(`${err.name}: ${err.message}\n${err.codeFrame}`);
                process.exit(1);
            } else {
                throw err;
            }

        }
    });
});
