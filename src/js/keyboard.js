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
            arrowNav: false,
            downKeys: {},
            focusedCol: false,
            focusedRow: false,
            latchedKeys: {}
        },
        rowDefs: [],
        numRows: "{osk.keyboard}.options.rowDefs.length",
        maxCols: "@expand:osk.keyboard.maxCols({that}.options.rowDefs)",
        // Needed to avoid trying to expand a single "{" as the start of an IoC expression."
        mergePolicy: { "rowDefs": "noexpand" },
        dynamicComponents: {
            rows: {
                type: "osk.row",
                container: "{that}.container",
                sources: "{that}.options.rowDefs",
                options: {
                    row: "{sourcePath}",
                    model: {
                        arrowNav: "{osk.keyboard}.model.arrowNav",
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
        invokers: {
            handleKeydown: {
                funcName: "osk.keyboard.handleKeyDown",
                args: ["{that}", "{arguments}.0"] // event
            },
            moveToNextCol: {
                funcName: "osk.keyboard.moveToNextCol",
                args: ["{that}"]
            },
            moveToNextRow: {
                funcName: "osk.keyboard.moveToNextRow",
                args: ["{that}"]
            },
            moveToPreviousCol: {
                funcName: "osk.keyboard.moveToPreviousCol",
                args: ["{that}"]
            },
            moveToPreviousRow: {
                funcName: "osk.keyboard.moveToPreviousRow",
                args: ["{that}"]
            }
        },
        listeners: {
            "onAction.handleLatches": {
                funcName: "osk.keyboard.processAction",
                args: ["{that}", "{arguments}.0"] // actionDef
            },
            "onCreate.bindKeyDown": {
                this: "{that}.container",
                method: "keydown",
                args: ["{that}.handleKeydown"]
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

    osk.keyboard.handleKeyDown = function (that, event) {
        // Arrow navigation handling
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(event.code) !== -1) {
            event.preventDefault();

            if (event.code === "ArrowLeft") {
                that.moveToPreviousCol();
            }
            else if (event.code === "ArrowRight") {
                that.moveToNextCol();
            }
            else if (event.code === "ArrowUp") {
                that.moveToPreviousRow();
            }
            else if (event.code === "ArrowDown") {
                that.moveToNextRow();
            }
        }
    };

    osk.keyboard.moveToNextCol = function (that) {
        var nextCol = that.model.focusedCol <  that.options.maxCols - 1 ? that.model.focusedCol + 1 : 0;
        that.applier.change("focusedCol", nextCol);
    };


    osk.keyboard.moveToNextRow = function (that) {
        var nextRow = that.model.focusedRow < that.options.numRows - 1 ? that.model.focusedRow + 1 : 0;
        that.applier.change("focusedRow", nextRow);
    };

    osk.keyboard.moveToPreviousCol = function (that) {
        var previousCol = that.model.focusedCol > 0 ? that.model.focusedCol - 1 : that.options.maxCols - 1;
        that.applier.change("focusedCol", previousCol);
    };

    osk.keyboard.moveToPreviousRow = function (that) {
        var previousRow = that.model.focusedRow > 0 ? that.model.focusedRow - 1 : that.options.numRows - 1;
        that.applier.change("focusedRow", previousRow);
    };
})(fluid);
