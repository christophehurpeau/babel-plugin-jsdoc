var assert = require('assert');
var babel = require('babel-core');
var chalk = require('chalk');
var clear = require('clear');
var diff = require('diff');
var fs = require('fs');

// require('babel/register');

var pluginPath = require.resolve('../dist');

function runTest() {
    [
        {
            active: true,
            prefix: '',
            presets: [],
            plugins: [
                "syntax-flow",
                "transform-class-constructor-call",
                "transform-class-properties",
                "transform-flow-strip-types"
            ]
        },
        {
            active: true,
            prefix: 'es2015-',
            presets: ['es2015-node5'],
            plugins: [
                "syntax-flow",
                "transform-class-constructor-call",
                "transform-class-properties",
                "transform-flow-strip-types"
            ]
        },
    ].forEach(options => {
        if (!options.active) {
            return;
        }

        var output = babel.transformFileSync(__dirname + '/fixtures/' + options.prefix + 'actual.js', {
            babelrc: false,
            presets: options.presets,
            plugins: options.plugins.concat([pluginPath]),
        });
        var expected = fs.readFileSync(__dirname + '/fixtures/' + options.prefix + 'expected.js', 'utf-8');

        function normalizeLines(str) {
            return str.trim().replace(/\*\/ */g,'*/ ').replace(/[ \t]+/g, ' ').replace(/[ \t]*\r?\n[ \t]*/g, '\n');
        }

        diff.diffLines(normalizeLines(output.code), normalizeLines(expected))
            .forEach(function (part) {
                var value = part.value;
                if (part.added) {
                    value = chalk.green(part.value);
                } else if (part.removed) {
                    value = chalk.red(part.value);
                }
                process.stdout.write(value);
            });

        console.log();
        console.log();
        console.log();
        console.log();
    });
}

if (process.argv.indexOf('--watch') >= 0) {
    require('watch').watchTree(__dirname + '/..', function () {
        delete require.cache[pluginPath];
        clear();
        console.log('Press Ctrl+C to stop watching...');
        console.log('================================');
        runTest();
    });
} else {
    runTest();
}
