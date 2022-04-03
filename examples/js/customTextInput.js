(function (fluid) {
    "use strict";

    fluid.defaults("osk.examples.customTextInput", {
        gradeNames: ["osk.templateRenderer"],

        markup: {
            container: "<div class='osk-examples-customTextInput'><div class='osk-custom-input'></div><hr/><div class='osk-keyboards-container'><div class='osk-keyboard'></div></div>"
        },

        selectors: {
            input: ".osk-custom-input",
            keyboard: ".osk-keyboard"
        },

        model: {
            latchedKeys: {}
        },

        components: {
            input: {
                type: "osk.inputs.text",
                container: "{osk.examples.customTextInput}.dom.input",
                options: {
                    model: {
                        afterCursor: " nav keys!",
                        beforeCursor: "Try the",
                        composition: "Try the nav keys!",
                        cursorIndex: 7
                    }
                }
            },
            keyboard: {
                type: "osk.keyboard.qwertyNav",
                container: "{osk.examples.customTextInput}.dom.keyboard",
                options: {
                    model: {
                        latchedKeys: "{osk.examples.customTextInput}.model.latchedKeys"
                    },
                    listeners: {
                        "onAction.updateInput": {
                            priority: "before:handleLatches",
                            funcName: "osk.examples.customTextInput.processAction",
                            args: ["{that}", "{osk.inputs.text}", "{arguments}.0"] // inputComponent, actionDef
                        }
                    }
                }
            }
        }
    });

    osk.examples.customTextInput.processAction = function (keyboardComponent, inputComponent, actionDef) {
        if (actionDef.action === "text") {
            var toAdd = actionDef.payload;
            // TODO: Add handling for control/alt/meta.
            if (keyboardComponent.model.latchedKeys.ShiftLeft || keyboardComponent.model.latchedKeys.ShiftRight ) {
                toAdd = actionDef.shiftPayload;
            }
            else if (keyboardComponent.model.latchedKeys.CapsLock) {
                toAdd = actionDef.capsPayload;
            }
            var isInsert = keyboardComponent.model.latchedKeys.Insert;
            inputComponent.addChar(toAdd, isInsert);
        }
        else if (actionDef.action === "backspace") {
            inputComponent.removePreviousChar();
        }
        else if (actionDef.action === "delete") {
            inputComponent.removeNextChar();
        }
        else if (actionDef.action === "up" || actionDef.action === "left") {
            inputComponent.moveCursor(-1);
        }
        else if (actionDef.action === "down" || actionDef.action === "right") {
            inputComponent.moveCursor(1);
        }
        else if (actionDef.action === "home") {
            inputComponent.moveCursorToStart();
        }
        else if (actionDef.action === "end") {
            inputComponent.moveCursorToEnd();
        }
    };
})(fluid);
