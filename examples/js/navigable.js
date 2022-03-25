(function (fluid) {
    "use strict";

    fluid.defaults("osk.examples.navigable.input", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            keyStateRegister: {}
        },
        invokers: {
            addText: {
                funcName: "osk.examples.navigable.input.addText",
                args: ["{that}.dom.container", "{arguments}.0"]
            }
        }
    });

    osk.examples.navigable.input.addText = function (container, textToAdd) {
        container[0].value = container[0].value + textToAdd;
    };

    fluid.defaults("osk.examples.navigable", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-examples-navigable'><input type='text' class='osk-form-input'></input><hr/><div class='osk-layout'</div>"
        },
        model: {
            keyStateRegister: {}
        },
        selectors: {
            input: ".osk-form-input",
            layout: ".osk-layout"
        },
        components: {
            input: {
                type: "osk.examples.navigable.input",
                container: "{osk.examples.navigable}.dom.input"
            },
            qwerty: {
                type: "osk.layout.qwerty",
                container: "{osk.examples.navigable}.dom.layout",
                options: {
                    model: {
                        keyStateRegister: "{osk.examples.navigable}.model.keyStateRegister"
                    },
                }
            }
        },
        modelListeners: {
            "keyStateRegister.*": {
                excludeSource: "init",
                funcName: "osk.examples.navigable.typeNewKeys",
                args: ["{that}", "{change}"]
            }
        }
    });

    osk.examples.navigable.typeNewKeys = function (that, change) {
        // Key down, and not for example, holding shift while a key is still depressed.
        if (!change.oldValue && change.value) {
            that.input.addText(change.value);
        }
    };
})(fluid);
