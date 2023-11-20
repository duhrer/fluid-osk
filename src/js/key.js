(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    osk.toUpperCase = function (originalString) {
        if (typeof originalString === "string") {
            return originalString.toUpperCase();
        }
        else {
            return "";
        }
    };

    // A base grade that is not designed to be focusable or navigable.
    fluid.defaults("osk.blank", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-key osk-key-%code'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></div>\n"
        },

        events: {
            onAction: null
        },

        capsPayload: "{that}.options.payload",
        label: "*",
        payload: "",
        shiftLabel: "@expand:osk.toUpperCase({that}.options.label)",
        shiftPayload: "@expand:osk.toUpperCase({that}.options.payload)",

        model: {
            isDeactivated: false,
            isDown: false,
            downKeys: {},
            code: "{that}.options.code",
            label: "{that}.options.label",
            payload: "{that}.options.payload",
            shiftLabel: "{that}.options.shiftLabel",
            shiftPayload: "{that}.options.shiftPayload"
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
            downKeys: {
                excludeSource: "init",
                funcName: "osk.key.relayRegisterChange",
                args: ["{that}"]
            }
        }
    });

    // A grade that is designed for use in a layout, i.e. that supports navigation between keys.
    fluid.defaults("osk.key", {
        gradeNames: ["osk.blank"],
        action: "text",
        markup: {
            container: "<button class='osk-key osk-key-%code'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></button>\n"
        },
        payload: "{that}.options.label",
        capsPayload: "{that}.options.label",
        shiftPayload: "{that}.options.shiftLabel",

        startCol: "{that}.options.col",
        endCol: "{that}.options.col",
        startRow: "{that}.options.row",
        endRow: "{that}.options.row",

        model: {
            col: "{that}.options.col",
            row: "{that}.options.row",
            focusedCol: false,
            focusedRow: false
        },
        modelListeners: {
            focusedCol: {
                excludeSource: "init",
                funcName: "osk.key.focus",
                args: ["{that}"]
            },
            focusedRow: {
                excludeSource: "init",
                funcName: "osk.key.focus",
                args: ["{that}"]
            }
        },
        invokers: {
            handleKeydown: {
                funcName: "osk.key.handleKeyEvent",
                args: ["{arguments}.0", "{that}.handleDown"] //event, callback
            },
            handleKeyup: {
                funcName: "osk.key.handleKeyEvent",
                args: ["{arguments}.0", "{that}.handleUp"] //event, callback
            },
            handleDown: {
                funcName: "osk.key.handleDown",
                args: ["{that}", "{arguments}.0"] // event
            },
            handleMouseClick: {
                funcName: "osk.key.handleActionEvent",
                args: ["{that}", "{arguments}.0"] // event
            },

            handleKeyClick: {
                funcName: "osk.key.handleKeyClick",
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
            "onCreate.bindMouseClick": {
                this: "{that}.container",
                method: "click",
                args: ["{that}.handleMouseClick"]
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
            "onCreate.bindKeyClick": {
                this: "{that}.container",
                method: "keydown",
                args: ["{that}.handleKeyClick"]
            },
            "onCreate.bindKeyup": {
                this: "{that}.container",
                method: "keyup",
                args: ["{that}.handleKeyup"]
            }
        }
    });

    osk.key.focus = function (that) {
        var shouldFocus = false;
        if (that.model.focusedRow === that.options.row) {
            var isLastColumn = that.options.endCol === that.options.rowCols - 1;
            if (
                (that.model.focusedCol >= that.options.startCol && that.model.focusedCol <= that.options.endCol) ||
                (isLastColumn && that.model.focusedCol > that.options.endCol)
            ) {
                shouldFocus = true;
            }
        }

        if (shouldFocus) {
            that.container[0].focus();
        }
        else if (!that.options.latch) {
            that.applier.change("isDown", false);
        }
    };

    osk.key.updateModelFocus = function (that) {
        that.applier.change("focusedCol", that.model.col);
        that.applier.change("focusedRow", that.model.row);
    };

    osk.key.handleDown = function (that, event) {
        if (!that.model.isDeactivated) {
            event.preventDefault();

            that.applier.change("isDown", true);
        }
    };

    osk.key.handleKeyClick = function (that, event) {
        var eventCode = fluid.get(event, "code");
        if (eventCode === "Space" || eventCode === "Enter") {
            osk.key.handleActionEvent(that, event, true);
        }
    };

    osk.key.handleActionEvent = function (that, event) {
        if (!that.model.isDeactivated) {
            event.preventDefault();

            that.events.onAction.fire({
                action: that.options.action,
                capsPayload: that.options.capsPayload,
                code: that.options.code,
                latch: that.options.latch,
                payload: that.options.payload,
                shiftPayload: that.options.shiftPayload
            });
        }
    };

    osk.key.handleUp = function (that, event) {
        if (!that.model.isDeactivated) {
            event.preventDefault();

            if (!that.options.latch) {
                that.applier.change("isDown", false);
            }
        }
    };

    osk.key.handleKeyEvent = function (event, callback) {
        var eventCode = fluid.get(event, "code");
        if (eventCode === "Space" || eventCode === "Enter") {
            callback(event);
        }
    };

    osk.key.relayDownChangeToRegister = function (that) {
        that.applier.change(["downKeys", that.options.code], that.model.isDown);
    };

    osk.key.relayRegisterChange = function (that) {
        var isDownValue = fluid.get(that.model, ["downKeys", that.options.code])  || false;
        that.applier.change("isDown", isDownValue);
    };

    // Mix-in grades to make the letter keys not display their upper and lower case.
    fluid.defaults("osk.key.letter", {
        isLetter: true,
        payload: "{that}.options.label",
        capsPayload: "@expand:osk.toUpperCase({that}.options.payload)",
        markup: {
            container: "<button class='osk-key osk-key-%code'><div class='osk-key-label'>%shiftLabel</div></button>\n"
        }
    });

    // Mix-in grade for keys without a shift label.
    fluid.defaults("osk.key.noShiftLabel", {
        markup: {
            container: "<button class='osk-key osk-key-%code'><div class='osk-key-label'>%label</div></button>\n"
        }
    });

    // Mix-in grade for the space bar.
    fluid.defaults("osk.key.space", {
        markup: {
            container: "<button class='osk-key osk-key-wide osk-key-%code'><div class='osk-key-label'>%label</div></button>\n"
        },
        invokers: {
            updateFocus: {
                funcName: "osk.key.space.updateModelFocus",
                args: ["{that}"]
            }
        }
    });


    osk.key.space.updateModelFocus = function (that) {
        that.applier.change("focusedRow", that.model.row);
    };
})(fluid);
