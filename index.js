let myvar = "aaa";

let somemodule = require('./modules/someModule')
let someOtherModule = require('./modules/someOtherModule')

let assert = require('chai').assert
let expect = require('chai').expect;


var Mocha = require('mocha');
var Chai = require('chai');
var Test = Mocha.Test;

var mochaInstance = new Mocha();
var suiteInstances = []

suiteInstance1 = Mocha.Suite.create(mochaInstance.suite, 'Test Suite 1');
suiteInstance2 = Mocha.Suite.create(mochaInstance.suite, 'Test Suite 2');

suiteInstances.push(suiteInstance1)

suiteInstance1.addTest(new Test('testing tests', function () {
    expect(2).to.equal(2);
}))

var jsonFileReporter = require('./modules/jsonFileReporter')

//{ output: './mochaReport.json' }
mochaInstance.reporter(jsonFileReporter.JsonFileReporter,{ output: './mochaReport.json' })
mochaInstance.run();


var tests = [
    { args: [1, 2], expected: 3 },
    { args: [1, 2, 3], expected: 6 },
    { args: [1, 2, 3, 4], expected: 10 }
];

tests.forEach(function (test) {
    suiteInstance2.addTest(new Test('correctly adds ' + test.args.length + ' args', function () {
        var res = add.apply(null, test.args);
        assert.equal(res, test.expected);
    }))
})