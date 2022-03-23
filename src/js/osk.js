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

    // TODO: Touch bindings

    fluid.defaults("osk.key", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<button class='osk-key'>%label</button>\n"
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
            keyStateRegister: {},
            label: "*",
            isDown: false,
            isDeactivated: false
        },
        modelListeners: {
            // https://api.jquery.com/toggleClass/#toggleClass-className-state
            // .toggleClass( classNames, state )
            isDown: [
                {
                    excludeSource: "init",
                    this: "{that}.container",
                    method: "toggleClass",
                    args: ["osk-key-isDown", "{change}.value"], // classNames, state
                },
                {
                    excludeSource: "init",
                    funcName: "osk.key.relayDownChangeToRegister",
                    args: ["{that}"]
                }
            ],
            isDeactivated: {
                excludeSource: "init",
                this: "{that}.container",
                method: "toggleClass",
                args: ["osk-key-isDeactivated", "{change}.value"], // classNames, state
            },
            keyStateRegister: {
                excludeSource: "init",
                funcName: "osk.key.relayRegisterChange",
                args: ["{that}"]
            }
        },
        invokers: {
            handleKeydown: {
                funcName: "osk.key.handleKeyEvent",
                args: ["{arguments}.0", "{that}.handleDown"] //event, callback
            },
            handleKeyup: {
                funcName: "osk.key.handleKeyEvent",
                args: ["{arguments}.0", "{that}.handleUp"] //event, callback
            },
            handleDown: {
                funcName: "osk.key.handleDown",
                args: ["{that}", "{arguments}.0"] // event
            },
            handleUp: {
                funcName: "osk.key.handleUp",
                args: ["{that}", "{arguments}.0"] // event
            }
        },
        listeners: {
            "onCreate.bindMousedown": {
                "this": "{that}.container",
                "method": "mousedown",
                "args": ["{that}.handleDown"]
            },
            "onCreate.bindMouseup": {
                "this": "{that}.container",
                "method": "mouseup",
                "args": ["{that}.handleUp"]
            },
            "onCreate.bindKeydown": {
                "this": "{that}.container",
                "method": "keydown",
                "args": ["{that}.handleKeydown"]
            },
            "onCreate.bindKeyup": {
                "this": "{that}.container",
                "method": "keyup",
                "args": ["{that}.handleKeyup"]
            }
        }
    });

    osk.key.handleDown = function (that, event) {
        if (!that.model.isDeactivated) {
            event.preventDefault();
            that.applier.change("isDown", true);
        }
    };

    osk.key.handleUp = function (that, event) {
        event.preventDefault();
        that.applier.change("isDown", false);
    };

    osk.key.handleKeyEvent = function (event, callback) {
        var eventCode = fluid.get(event, "code");
        if (eventCode === "Space" || eventCode === "Enter") {
            callback(event);
        }
    };

    osk.key.relayDownChangeToRegister = function (that) {
        // TODO: We need a more robust unique identifier for the register.
        that.applier.change(["keyStateRegister", that.model.label], that.model.isDown);
    };

    osk.key.relayRegisterChange = function (that) {
        var isDownValue = fluid.get(that.model, ["keyStateRegister", that.model.label])  || false;
        that.applier.change("isDown", isDownValue);
    };

    fluid.defaults("osk.row", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-row'></div>"
        },
        keyDefs: [ { label: "-"} ],
        model: {
            keyStateRegister: {}
        },
        dynamicComponents: {
            keys: {
                type: "osk.key",
                container: "{that}.container",
                sources: "{that}.options.keyDefs",
                options: {
                    model: {
                        isDeactivated: "{source}.isDeactivated",
                        label: "{source}.label",
                        keyStateRegister: "{osk.row}.model.keyStateRegister"
                    }
                }
            }
        }
    });

    // TODO: Figure how to relay key models up/down.
    /*
        Can't see any examples of sensibly defining a model relay as part of a dynamic component's {source}.  Talk to Ant.

        To pull changes up from keys to the outermost component, could distribute an onModelChange event listeners to
        all keys.  These would report the changes (i.e. keys pressed or release) and the outermost component would
        update its own internal register of what's held or not.  Don't know how to push changes down to the keys.  I
        was going to say that we'd need to use a "source" to avoid the model change round-tripping, but it should be
        fine for there to be one "bounce" in key->outermost changes that come back as outermost->key changes, as the
        key will not trigger the model listeners a second time.

        Distribute a function to programmatically wired up the model relay that is fired after each key is created?
        That would allow for outermost->key and key->outermost relays.

        Could also use a more react-like pattern, where the keydown/mousedown, etc. handlers are provided by the
        outermost component, and relay model changes downward to the keys.  This implies that we have a sensible
        strategy to do this (which we don't yet).

     */
    fluid.defaults("osk.layout", {
        gradeNames: ["osk.templateRenderer"],
        markup: {
            container: "<div class='osk-layout'></div>"
        },
        model: {
            keyStateRegister: {}
        },
        rowDefs: [
            [{ label: "1"}, { label: "2"}, { label: "3"}, { label: "4"}, { label: "5"}, { label: "6"}, { label: "7"}, { label: "8"}, { label: "9"}, { label: "0"}, { label: "-"}, { label: "+"}],
            [{ label: "Q"}, { label: "W"}, { label: "E"}, { label: "R"}, { label: "T"}, { label: "Y"}, { label: "U"}, { label: "I"}, { label: "O"}, { label: "P"}],
            [{ label: "A"}, { label: "S"}, { label: "D"}, { label: "F"}, { label: "G"}, { label: "H"}, { label: "J"}, { label: "K"}, { label: "L"}, { label: ":"}],
            [{ label: "Z"}, { label: "X"}, { label: "C"}, { label: "V"}, { label: "B"}, { label: "N"}, { label: "M"}, { label: ",", isDeactivated: true}, { label: "."}, { label: "?"}]
        ],
        dynamicComponents: {
            rows: {
                type: "osk.row",
                container: "{that}.container",
                sources: "{that}.options.rowDefs",
                options: {
                    model: { keyStateRegister: "{layout}.model.keyStateRegister"},
                    keyDefs: "{source}"
                }
            }
        }
    });
})(fluid);
