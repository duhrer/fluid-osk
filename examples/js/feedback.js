(function (fluid) {
    "use strict";
    fluid.defaults("osk.examples.feedback", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            downKeys: {}
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
                type: "osk.keyboard.qwerty",
                container: "{that}.dom.container",
                options: {
                    model: {
                        downKeys: "{osk.examples.feedback}.model.downKeys"
                    }
                }
            }
        },
        invokers: {
            "handleKeydown": {
                funcName: "osk.examples.feedback.handleKeydown",
                args: ["{that}", "{arguments}.0"] // event
            },
            "handleKeyup": {
                funcName: "osk.examples.feedback.handleKeyup",
                args: ["{that}", "{arguments}.0"] // event
            }
        },
        listeners: {
            "onCreate.wireKeyboardHandlers": {
                funcName: "osk.examples.feedback.wireKeyboardHandlers"
            }
        }
    });

    // TODO: Convert the underlying key handler to support an option to disable listening rather than forking the listener like this.
    osk.examples.feedback.handleKeydown = function (that, event) {
        that.applier.change(["downKeys", event.code], true);

        // Just to avoid navigating out of the demo.
        if (event.code === "Tab") { event.preventDefault(); }
    };

    osk.examples.feedback.handleKeyup = function (that, event) {
        that.applier.change(["downKeys", event.code], false);
    };

    osk.examples.feedback.wireKeyboardHandlers = function (that) {
        document.addEventListener("keydown", that.handleKeydown);
        document.addEventListener("keyup", that.handleKeyup);
    };
})(fluid);
