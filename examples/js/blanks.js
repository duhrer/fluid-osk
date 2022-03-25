(function (fluid) {
    "use strict";
    fluid.defaults("osk.examples.blanks", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            keyStateRegister: {}
        },
        markup: {
            onlyCap: "<div class='osk-key osk-key-%label'><div class='osk-key-shiftLabel'></div><div class='osk-key-label'>%shiftLabel</div></div>\n",
            wide: "<div class='osk-key osk-key-wide osk-key-%label'><div class='osk-key-shiftLabel'>%shiftLabel</div><div class='osk-key-label'>%label</div></div>\n"
        },
        keyGrade: "osk.blank",
        distributeOptions: {
            onlyCap: {
                source: "{that}.options.markup.onlyCap",
                target: "{that osk.key.onlyCap}.options.markup.container"
            },
            wide: {
                source: "{that}.options.markup.wide",
                target: "{that osk.key.wide}.options.markup.container"
            },
            blanks: {
                source: "{that}.options.keyGrade",
                target: "{that osk.row}.options.dynamicComponents.keys.type"
            }
        },
        components: {
            keyboard: {
                type: "osk.layout.qwerty",
                container: "{that}.dom.container",
                options: {
                    model: {
                        keyStateRegister: "{osk.examples.blanks}.model.keyStateRegister"
                    }
                }
            }
        },
        invokers: {
            "handleKeydown": {
                funcName: "osk.examples.blanks.handleKeydown",
                args: ["{that}", "{arguments}.0"] // event
            },
            "handleKeyup": {
                funcName: "osk.examples.blanks.handleKeyup",
                args: ["{that}", "{arguments}.0"] // event
            }
        },
        listeners: {
            "onCreate.wireKeyboardHandlers": {
                funcName: "osk.examples.blanks.wireKeyboardHandlers"
            }
        }
    });

    osk.examples.blanks.handleKeydown = function (that, event) {
        that.applier.change(["keyStateRegister", event.code], true);

        // Just to avoid navigating out of the demo.
        if (event.code === "Tab") { event.preventDefault(); }
    };

    osk.examples.blanks.handleKeyup = function (that, event) {
        that.applier.change(["keyStateRegister", event.code], false);
    };

    osk.examples.blanks.wireKeyboardHandlers = function (that) {
        document.addEventListener("keydown", that.handleKeydown);
        document.addEventListener("keyup", that.handleKeyup);
    };
})(fluid);
