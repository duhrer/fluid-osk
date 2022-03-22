/* eslint-env node */
"use strict";
var fluid = require("infusion");

require("../");
require("fluid-testem");

var outputFile = fluid.module.resolvePath("%fluid-binder/report.tap");

fluid.defaults("fluid.test.binder.testem", {
    gradeNames: ["fluid.testem"],
    sourceDirs: {
        src: "%fluid-binder/src"
    },
    contentDirs: {
        tests:   "%fluid-binder/tests"
    },
    testPages: ["tests/static/all-tests.html"],
    reportsDir: "%fluid-binder/reports",
    browserArgs: {
        // The `--headless` arg is needed until https://issues.fluid.net/browse/fluid-4145 is resolved.
        //
        // If you want to actually see the Firefox output, you'll need to run Testem manually, i.e.:
        // `node node_modules/testem/testem.js --file tests/testem.js`
        "Firefox": [
            "--no-remote",
            "--headless"
        ]
    },
    testemOptions: {
        "report_file": outputFile,
        "skip": "PhantomJS,Headless Chrome,Safari,IE"
    }
});

module.exports = fluid.test.binder.testem().getTestemOptions();
