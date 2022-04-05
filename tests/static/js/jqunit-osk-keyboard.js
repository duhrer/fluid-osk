/* globals jqUnit */
(function (fluid, jqUnit) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    jqUnit.module("Tests for osk.keyboard.");

    var testDefs = {
        closeSingleLatch: {
            message: "A one-time latch should close when the right action is sent.",
            componentOptions: {},
            actionDef: {
                latch: "once",
                code: "ShiftLeft"
            },
            expectedModel: {
                latchedKeys: { "ShiftLeft": "once" }
            }
        },
        closeHardLatch: {
            message: "A 'hard' latch should close when the right action is sent.",
            componentOptions: {},
            actionDef: {
                latch: "hard",
                code: "CapsLock"
            },
            expectedModel: {
                latchedKeys: { "CapsLock": "hard" }
            }
        },
        releaseSingleLatch: {
            message: "A one-time latch should release when a text action is sent.",
            componentOptions: {
                model: {
                    latchedKeys: { "ShiftRight": "once" }
                }
            },
            actionDef: {
                action: "text",
                code: "KeyX"
            },
            expectedModel: {
                latchedKeys: { "ShiftRight": false }
            }
        },
        preserveHardLatch: {
            message: "A 'hard' latch should stay latched when a text action is sent.",
            componentOptions: {
                model: {
                    latchedKeys: { "CapsLock": "hard" }
                }
            },
            actionDef: {
                action: "text",
                code: "KeyX"
            },
            expectedModel: {
                latchedKeys: { "CapsLock": "hard" }
            }
        },
        releaseHardLatch: {
            message: "A 'hard' latch should release when its action is sent again.",
            componentOptions: {
                model: {
                    latchedKeys: { "CapsLock": "hard" }
                }
            },
            actionDef: {
                latch: "hard",
                code: "CapsLock"
            },
            expectedModel: {
                latchedKeys: { "CapsLock": false }
            }
        }
    };

    fluid.each(testDefs, function (testDef) {
        jqUnit.test(testDef.message, function () {
            jqUnit.expect(1);
            var component = osk.keyboard("#qunit-tests", testDef.componentOptions);
            component.events.onAction.fire(testDef.actionDef);
            jqUnit.assertLeftHand("The model should be as expected.", testDef.expectedModel, component.model);
        });
    });

})(fluid, jqUnit);
