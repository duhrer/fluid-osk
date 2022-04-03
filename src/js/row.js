(function (fluid) {
    "use strict";

    fluid.defaults("osk.row", {
        gradeNames: ["osk.templateRenderer"],

        markup: {
            container: "<div class='osk-row'></div>"
        },

        events: {
            onAction: null
        },

        keyDefs: [],
        rowCols: "{osk.row}.options.keyDefs.length",
        maxCols: "{osk.row}.options.keyDefs.length",
        model: {
            downKeys: {}
        },
        dynamicComponents: {
            keys: {
                type: "osk.key",
                container: "{that}.container",
                sources: "{that}.options.keyDefs",
                options: {
                    gradeNames: "{source}.gradeNames",

                    col: "{sourcePath}",
                    row: "{osk.row}.options.row",
                    rowCols: "{osk.row}.options.rowCols",
                    maxCols: "{osk.row}.options.maxCols",
                    numRows: "{osk.row}.options.numRows",

                    action: "{source}.action",
                    capsPayload: "{source}.capsPayload",
                    code: "{source}.code",
                    label: "{source}.label",
                    latch: "{source}.latch",
                    payload: "{source}.payload",
                    shiftLabel: "{source}.shiftLabel",
                    shiftPayload: "{source}.shiftPayload",

                    model: {
                        downKeys: "{osk.row}.model.downKeys",
                        focusedCol: "{osk.row}.model.focusedCol",
                        focusedRow: "{osk.row}.model.focusedRow",
                        isDeactivated: "{source}.isDeactivated"
                    },

                    listeners: {
                        "onAction.notifyParent": {
                            func: "{osk.row}.events.onAction.fire",
                            args: ["{arguments}.0"] // key component
                        }
                    }
                }
            }
        }
    });
})(fluid);
