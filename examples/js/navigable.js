(function (fluid) {
    "use strict";

    fluid.defaults("osk.examples.navigable.input", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            composition: ""
        },
        invokers: {
            relayFormChange: {
                funcName: "osk.examples.navigable.input.relayFormChange",
                args: ["{that}"]
            }
        },
        // TODO: Consider whether fluid-binder would be beneficial here.
        listeners: {
            "onCreate.bind": {
                this: "{that}.container",
                method: "keydown",
                args: ["{that}.relayFormChange"]
            },
        },
        modelListeners: {
            composition: {
                excludeSource: "init",
                funcName: "osk.examples.navigable.input.updateText",
                args: ["{that}"]
            }
        }
    });

    osk.examples.navigable.input.updateText = function (that) {
        that.dom.container[0].value = that.model.composition;
    };

    osk.examples.navigable.input.relayFormChange = function (that) {
        that.applier.change("composition", that.dom.container[0].value);
    };

    fluid.defaults("osk.examples.navigable", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-examples-navigable'><input type='text' class='osk-form-input'></input><hr/><div class='osk-layout'</div>"
        },
        model: {
            composition: "",
            keyStateRegister: {}
        },
        selectors: {
            input: ".osk-form-input",
            layout: ".osk-layout"
        },
        components: {
            input: {
                type: "osk.examples.navigable.input",
                container: "{osk.examples.navigable}.dom.input",
                options: {
                    model: {
                        composition: "{osk.examples.navigable}.model.composition"
                    }
                }
            },
            qwerty: {
                type: "osk.layout.qwerty",
                container: "{osk.examples.navigable}.dom.layout",
                options: {
                    model: {
                        composition: "{osk.examples.navigable}.model.composition",
                        keyStateRegister: "{osk.examples.navigable}.model.keyStateRegister"
                    }
                }
            }
        }
    });
})(fluid);
