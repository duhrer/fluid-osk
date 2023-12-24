/* eslint-env node */
// The main file that is included when you run `require("fluid-osk")`.
"use strict";
var fluid = require("infusion");

// Register our content so it can be used with calls like fluid.module.resolvePath("%fluid-osk/path/to/content.js");
fluid.module.register("fluid-osk", __dirname, require);
