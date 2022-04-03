(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.keyboard", {
        gradeNames: ["osk.templateRenderer"],

        markup: {
            container: "<div class='osk-keyboard'></div>"
        },

        events: {
            onAction: null
        },

        model: {
            downKeys: {},
            focusedCol: false,
            focusedRow: false,
            latchedKeys: {}
        },
        rowDefs: [],
        maxCols: "@expand:osk.keyboard.maxCols({that.options.rowDefs})",
        // Needed to avoid trying to expand a single "{" as the start of an IoC expression."
        mergePolicy: { "rowDefs": "noexpand" },
        dynamicComponents: {
            rows: {
                type: "osk.row",
                container: "{that}.container",
                sources: "{that}.options.rowDefs",
                options: {
                    numRows: "{osk.keyboard}.options.rowDefs.length",
                    row: "{sourcePath}",
                    model: {
                        downKeys: "{osk.keyboard}.model.downKeys",
                        focusedCol: "{osk.keyboard}.model.focusedCol",
                        focusedRow: "{osk.keyboard}.model.focusedRow"
                    },
                    keyDefs: "{source}",
                    listeners: {
                        "onAction.notifyParent": {
                            func: "{osk.keyboard}.events.onAction.fire",
                            args: ["{arguments}.0"] // key component
                        }
                    }
                }
            }
        },
        listeners: {
            "onAction.handleLatches": {
                funcName: "osk.keyboard.processAction",
                args: ["{that}", "{arguments}.0"] // actionDef
            }
        }
    });

    osk.keyboard.maxCols = function (defsArray) {
        var maxCols = 0;
        fluid.each(defsArray, function (rowDef) {
            maxCols = Math.max(maxCols, rowDef.length);
        });
        return maxCols;
    };

    osk.keyboard.processAction = function (that, actionDef) {
        if (actionDef.latch) {
            var isLatched = fluid.get(that.model, ["latchedKeys", actionDef.code]) || false;
            if (isLatched) {
                that.applier.change(["downKeys", actionDef.code], false);
                that.applier.change(["latchedKeys", actionDef.code], false);
            }
            else {
                that.applier.change(["latchedKeys", actionDef.code], actionDef.latch);
            }
        }
        else if (actionDef.action === "text") {
            var updatedLatches = {};
            fluid.each(that.model.latchedKeys, function (latched, code) {
                if (latched === "hard") {
                    updatedLatches[code] = latched;
                }
                else {
                    updatedLatches[code] = false;
                    that.applier.change(["downKeys", code], false);
                }
            });
            that.applier.change("latchedKeys", updatedLatches);
        }
    };
})(fluid);
