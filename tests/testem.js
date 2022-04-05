/* eslint-env node */
"use strict";
var fluid = require("infusion");

require("../");
require("fluid-testem");

var outputFile = fluid.module.resolvePath("%fluid-osk/report.tap");

fluid.defaults("fluid.test.binder.testem", {
    gradeNames: ["fluid.testem"],
    sourceDirs: {
        src: "%fluid-osk/src"
    },
    contentDirs: {
        tests:   "%fluid-osk/tests"
    },
    testPages: ["tests/static/all-tests.html"],
    reportsDir: "%fluid-osk/reports",
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
        // The tests work in Safari, but the runner doesn't work unattended, so we skip it.
        // The tests work in Opera, but the runner takes ages because of a prompt, so we skip it.
        "skip": "PhantomJS,Headless Chrome,Opera,Safari,IE"
    }
});

module.exports = fluid.test.binder.testem().getTestemOptions();
