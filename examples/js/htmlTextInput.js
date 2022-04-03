(function (fluid) {
    "use strict";

    fluid.defaults("osk.examples.htmlTextInput.input", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            composition: ""
        },
        invokers: {
            relayFormChange: {
                funcName: "osk.examples.htmlTextInput.input.relayFormChange",
                args: ["{that}"]
            }
        },
        // TODO: Consider whether fluid-binder would be beneficial here.
        listeners: {
            "onCreate.bind": {
                this: "{that}.container",
                // TODO: See if the "input" event is sufficient.
                method: "keydown",
                args: ["{that}.relayFormChange"]
            },
        },
        modelListeners: {
            composition: {
                excludeSource: "init",
                funcName: "osk.examples.htmlTextInput.input.updateText",
                args: ["{that}"]
            }
        }
    });

    osk.examples.htmlTextInput.input.updateText = function (that) {
        that.dom.container[0].value = that.model.composition;
    };

    // Ensure that manual edits of the form field are relayed.
    osk.examples.htmlTextInput.input.relayFormChange = function (that) {
        that.applier.change("composition", that.dom.container[0].value);
    };

    osk.examples.htmlTextInput.processAction = function (that, actionDef) {
        if (actionDef.action === "text") {
            var toAdd = actionDef.payload;
            // TODO: Add handling for control/alt/meta.
            if (that.model.latchedKeys.ShiftLeft || that.model.latchedKeys.ShiftRight ) {
                toAdd = actionDef.shiftPayload;
            }
            else if (that.model.latchedKeys.CapsLock) {
                toAdd = actionDef.capsPayload;
            }

            that.applier.change("composition", that.model.composition + toAdd);
        }
        else if (actionDef.action === "backspace" && that.model.composition.length) {
            // Remove the last character.
            that.applier.change("composition", that.model.composition.slice(0, -1));
        }
        else if (actionDef.action === "delete") {
            // TODO: As we have no concept of a cursor position within the overall text yet, we can't implement this yet.
        }
    };

    fluid.defaults("osk.examples.htmlTextInput", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-examples-navigable'><input type='text' class='osk-form-input'></input><hr/><div class='osk-keyboard'</div>"
        },
        model: {
            composition: "",
            keyStateRegister: {}
        },
        selectors: {
            input: ".osk-form-input",
            keyboard: ".osk-keyboard"
        },
        components: {
            input: {
                type: "osk.examples.htmlTextInput.input",
                container: "{osk.examples.htmlTextInput}.dom.input",
                options: {
                    model: {
                        composition: "{osk.examples.htmlTextInput}.model.composition"
                    }
                }
            },
            qwerty: {
                type: "osk.keyboard.qwerty",
                container: "{osk.examples.htmlTextInput}.dom.keyboard",
                options: {
                    model: {
                        composition: "{osk.examples.htmlTextInput}.model.composition",
                        keyStateRegister: "{osk.examples.htmlTextInput}.model.keyStateRegister"
                    },
                    listeners: {
                        "onAction.updateComposition": {
                            priority: "before:handleLatches",
                            funcName: "osk.examples.htmlTextInput.processAction",
                            args: ["{that}", "{arguments}.0"] // actionDef
                        }
                    }
                }
            }
        }
    });
})(fluid);
