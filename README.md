# Introduction
This repository is just a couple of experiments with mocha framework.

## Mocha as unit test framework
When used as a unit test framework, "test" folder is uses to hold the unit/integration tests.
describe/context/it syntax is used

## Mocha as an embedded framework to execute dynamic tests
As a tool for testing, sometimes you don't have a static test suites to run but a set of assertions that you want to control in runtime. For instance, to execute different assertions depending on config flags for different environments, or different test level. In that case it can be convenient to embed mocha in your dynamic test execution, having a builder class to handle different test scenarios.
A mochaInstance containing test suites should be created, and then groups of asserts can be added as individual tests
mochaInstance.run() is the way to execute
"index.js" file is used for this way of running tests



## Mocha reporting
When working with mocha as an embedded framework, building reports and writing to a specific json file is not supported out of the CLI for all reporters, so I built a custom reporter that does that following these guides: 
- https://mochajs.org/api/tutorial-custom-reporter.html
- https://github.com/mochajs/mocha/wiki/Third-party-reporters

There was a contributor @mkamioner that tried to modify json reporter to do that, I took partially that work:
- https://github.com/mkamioner/mocha/blob/55b1f82e2c1b4d91dec4690c574314dfcc9f766d/lib/reporters/json.js


By default mochaReport.json [mochaReport.json](./mochaReport.json) file is created (attached as example). 


What could be enhanced:
- Reports per suite, with a suites node added to the json file
