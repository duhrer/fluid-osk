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

    // TODO: Make a demonstration for this.
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
        var newBeforeCursor = that.model.beforeCursor + charToAdd;
        that.applier.change("beforeCursor", newBeforeCursor);

        if (isInsert) {
            var newAfterCursor = that.model.afterCursor.slice(1);
            that.applier.change("afterCursor", newAfterCursor);

            var compositionAfterInsert = newBeforeCursor + newAfterCursor;
            that.applier.change("composition", compositionAfterInsert);
        }
        else {
            var newComposition = newBeforeCursor + that.model.afterCursor;
            that.applier.change("composition", newComposition);
        }

        that.applier.change("cursorIndex", that.model.cursorIndex + 1);
    };

    osk.inputs.text.moveCursor = function (that, changeInPosition) {
        var newCursorIndex = that.model.cursorIndex + changeInPosition;
        if (newCursorIndex >= 0 && newCursorIndex < that.model.composition.length) {
            that.applier.change("cursorIndex", newCursorIndex);

            var newBeforeCursor = that.model.composition.slice(0, newCursorIndex);
            that.applier.change("beforeCursor", newBeforeCursor);

            var newAfterCursor = that.model.composition.slice(newCursorIndex);
            that.applier.change("afterCursor", newAfterCursor);
        }
    };

    osk.inputs.text.moveCursorToEnd = function (that) {
        that.applier.change("afterCursor", "");
        that.applier.change("beforeCursor", that.model.composition);
        that.applier.change("cursorIndex", that.model.composition.length);
    };

    osk.inputs.text.moveCursorToStart = function (that) {
        that.applier.change("afterCursor", that.model.composition);
        that.applier.change("beforeCursor", "");
        that.applier.change("cursorIndex", 0);
    };

    osk.inputs.text.removeNextChar = function (that) {
        if (that.model.cursorIndex < that.model.composition.length) {
            var newAfterCursor = that.model.afterCursor.slice(1);
            that.applier.change("afterCursor", newAfterCursor);
            that.applier.change("composition", that.model.beforeCursor + newAfterCursor);
        }
    };

    osk.inputs.text.removePreviousChar = function (that) {
        if (that.model.cursorIndex > 0) {
            var newBeforeCursor = that.model.beforeCursor.slice(0, -1);
            that.applier.change("beforeCursor", newBeforeCursor);
            that.applier.change("composition", newBeforeCursor + that.model.afterCursor);
            that.applier.change("cursorIndex", that.model.cursorIndex - 1);
        }
    };

    // TODO: Make a text area equivalent if needed/requested.
})(fluid);
