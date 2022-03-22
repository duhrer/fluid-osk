(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.templateRenderer", {
        gradeNames: ["fluid.containerRenderingView"],
        markup: {
            container: ""
        },
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

    // TODO: Make key bindings actually do something
    // TODO: Mouse bindings
    // TODO: Touch bindings

    fluid.defaults("osk.key", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-key'>%label</div>\n"
        },

        // TODO: Define a sensible definition for multiple modes and keyboard event payloads
        // altKey
        // code
        // ctrlKey
        // isComposing
        // key
        // location
        // metaKey
        // repeat
        // shiftKey

        model: {
            label: "X",
            isDown: false,
            isDeactivated: false
        },
        modelListeners: {
            // https://api.jquery.com/toggleClass/#toggleClass-className-state
            // .toggleClass( classNames, state )
            isDown: {
                excludeSource: "init",
                this: "{that}.container",
                method: "toggleClass",
                args: ["osk-key-isDown", "{change}.value"], // classNames, state
            },
            isDeactivated: {
                excludeSource: "init",
                this: "{that}.container",
                method: "toggleClass",
                args: ["osk-key-isDeactivated", "{change}.value"], // classNames, state
            }
        },
        invokers: {
            handleClick: {
                funcName: "console.log",
                args: ["click"]
            }
        },
        listeners: {
            "onCreate.bindClick": {
                "this": "{that}.container",
                "method": "click",
                "args": ["{that}.handleClick"]
            }
        }
    });

    fluid.defaults("osk.row", {
        gradeNames: ["osk.templateRenderer"],
        template: "<div class='osk-row'></div>",
        selectors: { keys: ".osk-row" },
        dynamicComponents: {
            keys: {
                type: "osk.key",
                container: "{that}.dom.keys",
                sources: "{that}.options.keyDefs"
            }
        }
    });

    // TODO: Figure how to relay key models up/down.
    fluid.defaults("osk.layout", {
        gradeNames: ["osk.templateRenderer"],
        template: "<div class='osk-layout'></div>",
        selectors: { rows: ".osk-layout" },
        // TODO: Move this out to test fixtures and examples
        rowDefs: [ [{ label: "A"}] ],
        dynamicComponents: {
            rows: {
                type: "osk.row",
                container: "{that}.dom.rows",
                sources: "{that}.options.rowDefs",
                options: {
                    keyDefs: "{source}"
                }
            }
        }
    });
})(fluid);
