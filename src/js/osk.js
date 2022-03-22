(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.templateRenderer", {
        gradeNames: ["fluid.containerRenderingView"],
        excludedOptions: ["excludedOptions", "model", "invokers", "listeners", "modelListeners", "members", "components", "template"],
        events: {
            afterRerender: null
        },

        markup: {
            container: ""
        },
        invokers: {
            getClassnames: {
                funcName: "fluid.identity",
                args: [[]]
            },
            renderMarkup: {
                funcName: "osk.templateRenderer.render",
                args: ["{that}", "{that}.options.markup"]
            },
            reRender: {
                funcName: "osk.templateRenderer.reRender",
                args: ["{that}"]
            }
        }
    });

    osk.templateRenderer.render = function (that, markupTemplate) {
        var classNames= that.getClassnames();
        var sanitisedPayload = {
            classNames: classNames,
            model: that.model
        };

        var renderedContent = fluid.stringTemplate(that.options.markup.container, sanitisedPayload);
        return renderedContent;
    };

    osk.templateRenderer.reRender = function (that) {
        that.container.remove();
        that.container = that.renderContainer();
        that.events.afterRerender.fire();
    }

    // TODO: Make key bindings actually do something
    // TODO: Mouse bindings
    // TODO: Touch bindings

    fluid.defaults("osk.key", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='%classNames'>%model.label</div>\n"
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
            isDown:        { func: "{that}.reRender", excludeSource: "init" },
            isDeactivated: { func: "{that}.reRender", excludeSource: "init" },
        },
        invokers: {
            getClassnames: {
                funcName: "osk.key.getClassnames",
                args: ["{that}"]
            },
            handleClick: {
                funcName: "console.log",
                args: ["click"]
            }
        },
        listeners: {
            // We have to create separate bindings for the initial render and rerendering, because if we trigger
            // "afterRender" during the onCreate, we get warnings about a circular reference to the container.
            "onCreate.bindClick": {
                "this": "{that}.container",
                "method": "click",
                "args": ["{that}.handleClick"]
            },
            "afterRerender.bindClick": {
                "this": "{that}.container",
                "method": "click",
                "args": ["{that}.handleClick"]
            }
        }
    });

    osk.key.getClassnames = function (that) {
        var classNames = ["osk-key"];

        fluid.each(["isDown", "isDeactivated"], function (modelValueKey) {
            if (fluid.get(that.model, modelValueKey)) {
                classNames.push("osk-key-" + modelValueKey);
            }
        });

        return classNames.join(" ");
    }

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
