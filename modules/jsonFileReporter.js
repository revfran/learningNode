// jsonFileReporter
var mocha = require('mocha');

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var constants = mocha.Runner.constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_RUN_END = constants.EVENT_RUN_END;

module.exports.JsonFileReporter = JsonFileReporter;
/**
 * Constructs a new `JSONStream` reporter instance.
 *
 * @private
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param mocha.Runner runner - Instance triggers reporter actions.
 * @param Object [options] - runner options
 */
function JsonFileReporter(runner, options) {
    mocha.reporters.Base.call(this, runner);

    var self = this;
    var tests = [];
    var pending = [];
    var failures = [];
    var passes = [];
    let fileName;
    if (options && options.reporterOptions) {
        if (options.reporterOptions.output) {
            if (!fs.writeFileSync) {
                throw new Error('file output not supported in browser');
            }
            mkdirp.sync(path.dirname(options.reporterOptions.output));
            fileName = path.resolve(options.reporterOptions.output);
        }
    }

    runner.on(EVENT_TEST_END, function (test) {
        tests.push(test);
    });

    runner.on(EVENT_TEST_PASS, function (test) {
        passes.push(test);
    });

    runner.on(EVENT_TEST_FAIL, function (test) {
        failures.push(test);
    });

    runner.on(EVENT_TEST_PENDING, function (test) {
        pending.push(test);
    });

    runner.once(EVENT_RUN_END, function () {
        var obj = {
            stats: self.stats,
            tests: tests.map(clean),
            pending: pending.map(clean),
            failures: failures.map(clean),
            passes: passes.map(clean)
        };

        runner.testResults = obj;

        write(JSON.stringify(obj, null, 2));
    });

    /**
     * Writes data depending on fileName property in stdout or a filename
     *
     * @private
     * @param {String} data
     */
    function write(data) {
        if (fileName) {
            fs.writeFileSync(fileName, data);
            console.log(data)
        } else if (typeof process === 'object' && process.stdout) {
            process.stdout.write(data);
        } else {
            console.log(data);
        }
    };

    /**
     * Return a plain-object representation of `test`
     * free of cyclic properties etc.
     *
     * @private
     * @param {Object} test
     * @return {Object}
     */
    function clean(test) {
        var err = test.err || {};
        if (err instanceof Error) {
            err = errorJSON(err);
        }

        return {
            suite: test.parent.title,
            title: test.title,
            fullTitle: test.fullTitle(),
            file: test.file,
            duration: test.duration,
            currentRetry: test.currentRetry(),
            err: cleanCycles(err),  
        };
    }
    /**
     * Replaces any circular references inside `obj` with '[object Object]'
     *
     * @private
     * @param {Object} obj
     * @return {Object}
     */
    function cleanCycles(obj) {
        var cache = [];
        return JSON.parse(
            JSON.stringify(obj, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Instead of going in a circle, we'll print [object Object]
                        return '' + value;
                    }
                    cache.push(value);
                }

                return value;
            })
        );
    }

/**
 * Transform an Error object into a JSON object.
 *
 * @private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
    var res = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
      res[key] = err[key];
    }, err);
    return res;
  }
  
}



// To have this reporter "extend" a built-in reporter uncomment the following line:
//mocha.utils.inherits(JsonFileReporter, mocha.reporters.JSON);