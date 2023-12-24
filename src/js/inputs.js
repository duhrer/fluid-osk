(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.inputs.text.displayModelVariable", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            text: ""
        },

        // Relay our key model variable to the text of our container.
        modelListeners: {
            text: {
                this: "{that}.container",
                method: "text",
                args: ["{that}.model.text"]
            }
        }
    });

    // TODO: Styles for everything, especially cursor and enclosing container.
    fluid.defaults("osk.inputs.text", {
        gradeNames: ["osk.templateRenderer"],

        markup: {
            container: "<div class='osk-text-input'><div class='osk-text-input-before-cursor'></div><div class='osk-text-input-cursor'></div><div class='osk-text-input-after-cursor'></div></div>"
        },

        selectors: {
            "afterCursor": ".osk-text-input-after-cursor",
            "beforeCursor": ".osk-text-input-before-cursor"
        },

        model: {
            afterCursor: "",
            beforeCursor: "",
            composition: "",
            cursorIndex: 0
        },

        invokers: {
            addChar: {
                funcName: "osk.inputs.text.addChar",
                args: ["{that}", "{arguments}.0", "{arguments}.1"] // charToAdd, isInsert
            },
            moveCursor: {
                funcName: "osk.inputs.text.moveCursor",
                args: ["{that}", "{arguments}.0"] // changeInPosition
            },
            moveCursorToEnd: {
                funcName: "osk.inputs.text.moveCursorToEnd",
                args: ["{that}"]
            },
            moveCursorToStart: {
                funcName: "osk.inputs.text.moveCursorToStart",
                args: ["{that}"]
            },
            removeNextChar: {
                funcName: "osk.inputs.text.removeNextChar",
                args: ["{that}"]
            },
            removePreviousChar: {
                funcName: "osk.inputs.text.removePreviousChar",
                args: ["{that}"]
            }
        },

        components: {
            afterCursor: {
                type: "osk.inputs.text.displayModelVariable",
                container: "{osk.inputs.text}.dom.afterCursor",
                options: {
                    model: {
                        text: "{osk.inputs.text}.model.afterCursor"
                    }
                }
            },
            beforeCursor: {
                type: "osk.inputs.text.displayModelVariable",
                container: "{osk.inputs.text}.dom.beforeCursor",
                options: {
                    model: {
                        text: "{osk.inputs.text}.model.beforeCursor"
                    }
                }
            }
        }
    });

    osk.inputs.text.addChar = function (that, charToAdd, isInsert) {
        var transaction = that.applier.initiate();

        var newBeforeCursor = that.model.beforeCursor + charToAdd;
        transaction.fireChangeRequest({ path:"beforeCursor", value: newBeforeCursor});

        if (isInsert) {
            var newAfterCursor = that.model.afterCursor.slice(1);
            transaction.fireChangeRequest({ path: "afterCursor", value: newAfterCursor});

            var compositionAfterInsert = newBeforeCursor + newAfterCursor;
            transaction.fireChangeRequest({ path: "composition", value: compositionAfterInsert, source: "local"});
        }
        else {
            var newComposition = newBeforeCursor + that.model.afterCursor;
            transaction.fireChangeRequest({ path: "composition", value: newComposition, source: "local"});
        }

        transaction.fireChangeRequest({ path: "cursorIndex", value: that.model.cursorIndex + 1 });

        transaction.commit();
    };

    osk.inputs.text.moveCursor = function (that, changeInPosition) {
        var newCursorIndex = that.model.cursorIndex + changeInPosition;
        if (newCursorIndex >= 0 && newCursorIndex <= that.model.composition.length) {
            var transaction = that.applier.initiate();

            transaction.fireChangeRequest({ path: "cursorIndex", value: newCursorIndex });

            var newBeforeCursor = that.model.composition.slice(0, newCursorIndex);
            transaction.fireChangeRequest({ path: "beforeCursor", value: newBeforeCursor});

            var newAfterCursor = that.model.composition.slice(newCursorIndex);
            transaction.fireChangeRequest({path: "afterCursor", value: newAfterCursor});

            transaction.commit();
        }
    };

    osk.inputs.text.moveCursorToEnd = function (that) {
        var transaction = that.applier.initiate();

        transaction.fireChangeRequest({path: "afterCursor", value: ""});
        transaction.fireChangeRequest({path: "beforeCursor", value: that.model.composition});
        transaction.fireChangeRequest({path: "cursorIndex", value: that.model.composition.length});

        transaction.commit();
    };

    osk.inputs.text.moveCursorToStart = function (that) {
        var transaction = that.applier.initiate();

        transaction.fireChangeRequest({path: "afterCursor", value: that.model.composition});
        transaction.fireChangeRequest({path: "beforeCursor", value: ""});
        transaction.fireChangeRequest({path: "cursorIndex", value: 0});

        transaction.commit();
    };

    osk.inputs.text.removeNextChar = function (that) {
        if (that.model.cursorIndex < that.model.composition.length) {
            var transaction = that.applier.initiate();

            var newAfterCursor = that.model.afterCursor.slice(1);
            transaction.fireChangeRequest({path: "afterCursor", value: newAfterCursor});
            transaction.fireChangeRequest({path: "composition", value: that.model.beforeCursor + newAfterCursor, source: "local"});

            transaction.commit();
        }
    };

    osk.inputs.text.removePreviousChar = function (that) {
        if (that.model.cursorIndex > 0) {
            var transaction = that.applier.initiate();

            var newBeforeCursor = that.model.beforeCursor.slice(0, -1);
            transaction.fireChangeRequest({path: "beforeCursor", value: newBeforeCursor});
            transaction.fireChangeRequest({path: "composition", value: (newBeforeCursor + that.model.afterCursor), source: "local"});
            transaction.fireChangeRequest({path: "cursorIndex", value: that.model.cursorIndex - 1 });

            transaction.commit();
        }
    };

    // TODO: Make a text area equivalent if needed/requested.
})(fluid);
