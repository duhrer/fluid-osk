(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.templateRenderer", {
        gradeNames: ["fluid.containerRenderingView"],
        markup: {
            container: ""
        },
        model: {},
        invokers: {
            renderMarkup: {
                funcName: "osk.templateRenderer.render",
                args: ["{that}", "{that}.options.markup.container", "{that}.model"]
            }
        }
    });

    osk.templateRenderer.render = function (that, markupTemplate, model) {
        var renderedContent = fluid.stringTemplate(markupTemplate, model);
        return renderedContent;
    };

    // A base grade that is not designed to be focusable or navigable.
    fluid.defaults("osk.blank", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-key osk-key-%label'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></div>\n"
        },
        model: {
            keyStateRegister: {},
            label: "*",
            isDown: false,
            isDeactivated: false
        },
        modelListeners: {
            // https://api.jquery.com/toggleClass/#toggleClass-className-state
            // .toggleClass( classNames, state )
            isDown: [
                {
                    this: "{that}.container",
                    method: "toggleClass",
                    args: ["osk-key-isDown", "{change}.value"] // classNames, state
                },
                {
                    excludeSource: "init",
                    funcName: "osk.key.relayDownChangeToRegister",
                    args: ["{that}"]
                }
            ],
            isDeactivated: {
                this: "{that}.container",
                method: "toggleClass",
                args: ["osk-key-isDeactivated", "{change}.value"] // classNames, state
            },
            keyStateRegister: {
                excludeSource: "init",
                funcName: "osk.key.relayRegisterChange",
                args: ["{that}"]
            }
        }
    })

    // A grade that is designed for use in a layout, i.e. that supports navigation between keys.
    fluid.defaults("osk.key", {
        gradeNames: ["osk.blank"],
        markup: {
            container: "<button class='osk-key osk-key-%label'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></button>\n"
        },
        model: {
            col: "{that}.options.col",
            row: "{that}.options.row",
            focusedCol: false,
            focusedRow: false
        },
        modelListeners: {
            focusedCol: {
                funcName: "osk.key.focus",
                args: ["{that}"]
            },
            focusedRow: {
                funcName: "osk.key.focus",
                args: ["{that}"]
            }
        },
        invokers: {
            handleKeydown: {
                funcName: "osk.key.handleKeyDown",
                args: ["{that}", "{arguments}.0", "{that}.handleDown"] //event, callback
            },
            handleKeyup: {
                funcName: "osk.key.handleKeyEvent",
                args: ["{arguments}.0", "{that}.handleUp"] //event, callback
            },
            handleDown: {
                funcName: "osk.key.handleDown",
                args: ["{that}", "{arguments}.0"] // event
            },
            handleUp: {
                funcName: "osk.key.handleUp",
                args: ["{that}", "{arguments}.0"] // event
            },
            updateFocus: {
                funcName: "osk.key.updateModelFocus",
                args: ["{that}"]
            }
        },
        listeners: {
            // TODO: Touch bindings
            "onCreate.bindFocus": {
                this: "{that}.container",
                method: "focus",
                args: ["{that}.updateFocus"]
            },
            "onCreate.bindMousedown": {
                this: "{that}.container",
                method: "mousedown",
                args: ["{that}.handleDown"]
            },
            "onCreate.bindMouseup": {
                this: "{that}.container",
                method: "mouseup",
                args: ["{that}.handleUp"]
            },
            "onCreate.bindMouseout": {
                this: "{that}.container",
                method: "mouseout",
                args: ["{that}.handleUp"]
            },
            "onCreate.bindKeydown": {
                this: "{that}.container",
                method: "keydown",
                args: ["{that}.handleKeydown"]
            },
            "onCreate.bindKeyup": {
                this: "{that}.container",
                method: "keyup",
                args: ["{that}.handleKeyup"]
            }
        }
    });

    osk.key.focus = function (that) {
        if (that.model.row === that.model.focusedRow) {
            var isLastColumn = that.model.col === that.options.rowCols - 1;
            if (that.model.col === that.model.focusedCol || isLastColumn && that.model.focusedCol > that.model.col) {
                that.container.focus();
            }
        }
    };

    osk.key.updateModelFocus = function (that) {
        that.applier.change("focusedCol", that.model.col);
        that.applier.change("focusedRow", that.model.row);
    };

    osk.key.handleDown = function (that, event) {
        if (!that.model.isDeactivated) {
            event.preventDefault();

            var isShiftHeld = fluid.find(["ShiftLeft", "ShiftRight", "CapsLock"], function (code) {
                return fluid.get(that.model, ["keyStateRegister", code]);
            });

            var textToAdd = isShiftHeld ? that.model.shiftLabel : that.model.label;

            that.applier.change("isDown", textToAdd);
        }
    };

    osk.key.handleUp = function (that, event) {
        event.preventDefault();
        that.applier.change("isDown", false);
    };

    osk.key.handleKeyEvent = function (event, callback) {
        var eventCode = fluid.get(event, "code");
        if (eventCode === "Space" || eventCode === "Enter") {
            callback(event);
        }
    };

    osk.key.handleKeyDown = function (that, event, callback) {
        var eventCode = fluid.get(event, "code");
        // Arrow handling
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(eventCode) !== -1) {
            event.preventDefault();
            that.applier.change("isDown", false);

            if (eventCode === "ArrowLeft") {
                var previousCol = that.model.focusedCol > 0 ? that.model.focusedCol - 1 : that.options.rowCols - 1;
                that.applier.change("focusedCol", previousCol);
            }
            else if (eventCode === "ArrowRight") {
                var nextCol = that.model.focusedCol <  that.options.rowCols - 1 ? that.model.focusedCol + 1 : 0;
                that.applier.change("focusedCol", nextCol);
            }
            else if (eventCode === "ArrowUp") {
                var previousRow = that.model.focusedRow > 0 ? that.model.focusedRow - 1 : that.options.numRows - 1;
                that.applier.change("focusedRow", previousRow);
            }
            else if (eventCode === "ArrowDown") {
                var nextRow = that.model.focusedRow < that.options.numRows - 1 ? that.model.focusedRow + 1 : 0;
                that.applier.change("focusedRow", nextRow);
            }
        }
        else {
            osk.key.handleKeyEvent(event,callback);
        }
    };

    osk.key.relayDownChangeToRegister = function (that) {
        that.applier.change(["keyStateRegister", that.model.code], that.model.isDown);
    };

    osk.key.relayRegisterChange = function (that) {
        var isDownValue = fluid.get(that.model, ["keyStateRegister", that.model.code])  || false;
        that.applier.change("isDown", isDownValue);
    };

    // Mix-in grades to make the letter keys not display their upper and lower case.
    fluid.defaults("osk.key.onlyCap", {
        markup: {
            container: "<button class='osk-key osk-key-%label'><div class='osk-key-shiftLabel'></div><div class='osk-key-label'>%shiftLabel</div></button>\n"
        }
    });

    // Mix-in grade for ultra-wide keys like the space bar.
    fluid.defaults("osk.key.wide", {
        markup: {
            container: "<button class='osk-key osk-key-wide osk-key-%label'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></button>\n"
        },
        invokers: {
            handleKeydown: {
                funcName: "osk.key.wide.handleKeyDown",
                args: ["{that}", "{arguments}.0", "{that}.handleDown"] //event, callback
            },
            updateFocus: {
                funcName: "osk.key.wide.updateModelFocus",
                args: ["{that}"]
            }
        },
        modelListeners: {
            focusedCol: {
                funcName: "osk.key.wide.focus",
                args: ["{that}"]
            },
            focusedRow: {
                funcName: "osk.key.wide.focus",
                args: ["{that}"]
            }
        }
    });

    osk.key.wide.focus = function (that) {
        if (that.model.row === that.model.focusedRow) {
            that.container.focus();
        }
    };

    osk.key.wide.updateModelFocus = function (that) {
        that.applier.change("focusedRow", that.model.row);
    };

    osk.key.wide.handleKeyDown = function (that, event, callback) {
        var eventCode = fluid.get(event, "code");
        // Arrow handling
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(eventCode) !== -1) {
            event.preventDefault();
            that.applier.change("isDown", false);

            if (eventCode === "ArrowLeft") {
                // Wrap around based on the width of the other rows.
                var previousCol = that.model.focusedCol > 0 ? that.model.focusedCol - 1 : 15;
                that.applier.change("focusedCol", previousCol);
            }
            else if (eventCode === "ArrowRight") {
                var nextCol = that.model.focusedCol <  14 ? that.model.focusedCol + 1 : 0;
                that.applier.change("focusedCol", nextCol);
            }
            else if (eventCode === "ArrowUp") {
                var previousRow = that.model.focusedRow > 0 ? that.model.focusedRow - 1 : that.options.numRows - 1;
                that.applier.change("focusedRow", previousRow);
            }
            else if (eventCode === "ArrowDown") {
                var nextRow = that.model.focusedRow < that.options.numRows - 1 ? that.model.focusedRow + 1 : 0;
                that.applier.change("focusedRow", nextRow);
            }
        }
        else {
            osk.key.handleKeyEvent(event,callback);
        }
    };

    fluid.defaults("osk.row", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-row'></div>"
        },
        keyDefs: [ { code: "Digit2", label: "2", shiftLabel: "@"} ],
        rowCols: "{osk.row}.options.keyDefs.length",
        maxCols: "{osk.row}.options.keyDefs.length",
        model: {
            keyStateRegister: {}
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
                    model: {
                        isDeactivated: "{source}.isDeactivated",
                        code: "{source}.code",
                        focusedCol: "{osk.row}.model.focusedCol",
                        focusedRow: "{osk.row}.model.focusedRow",
                        label: "{source}.label",
                        shiftLabel: "{source}.shiftLabel",
                        keyStateRegister: "{osk.row}.model.keyStateRegister"
                    }
                }
            }
        }
    });

    fluid.defaults("osk.layout", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-layout'</div>"
        },
        model: {
            keyStateRegister: {},
            focusedRow: false,
            focusedCol: false
        },
        rowDefs: [
            [{ code: "Digit1", label: "1", shiftLabel: "!"}]
        ],
        maxCols: "@expand:osk.layout.maxCols({that.options.rowDefs})",
        // Needed to avoid trying to expand a single "{" as the start of an IoC expression."
        mergePolicy: { "rowDefs": "noexpand" },
        dynamicComponents: {
            rows: {
                type: "osk.row",
                container: "{that}.container",
                sources: "{that}.options.rowDefs",
                options: {
                    numRows: "{osk.layout}.options.rowDefs.length",
                    row: "{sourcePath}",
                    model: {
                        focusedCol: "{layout}.model.focusedCol",
                        focusedRow: "{layout}.model.focusedRow",
                        keyStateRegister: "{layout}.model.keyStateRegister"
                    },
                    keyDefs: "{source}"
                }
            }
        }
    });

    osk.layout.maxCols = function (defsArray) {
        var maxCols = 0;
        fluid.each(defsArray, function (rowDef) {
            maxCols = Math.max(maxCols, rowDef.length);
        });
        return maxCols;
    };

})(fluid);
