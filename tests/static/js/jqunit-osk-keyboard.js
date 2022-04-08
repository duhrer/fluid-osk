/* globals jqUnit */
(function (fluid, jqUnit) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    jqUnit.module("Action tests for osk.keyboard.");

    var actionTestDefs = {
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

    fluid.each(actionTestDefs, function (actionTestDef) {
        jqUnit.test(actionTestDef.message, function () {
            jqUnit.expect(1);
            var component = osk.keyboard("#qunit-tests", actionTestDef.componentOptions);
            component.events.onAction.fire(actionTestDef.actionDef);
            jqUnit.assertLeftHand("The model should be as expected.", actionTestDef.expectedModel, component.model);
        });
    });

    // Generate a 5 x 5 grid of keys to avoid issues with maxCols and numRows.
    var simulatedRow = fluid.generate(5, fluid.copy(osk.keydefsByCode.KeyX));
    var simulatedGrid = fluid.generate(5, fluid.copy(simulatedRow));

    // Arrow key handling.
    var arrowNavigationTestsDefs = {
        previousCol: {
            message: "The left arrow should decrease the focused column.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedCol: 2 }},
            eventCode: "ArrowLeft",
            pathToCheck: "model.focusedCol",
            expectedValue: 1
        },
        previousColWrap: {
            message: "The left arrow should wrap around from the first column to the last.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedCol: 0 }},
            eventCode: "ArrowLeft",
            pathToCheck: "model.focusedCol",
            expectedValue: 4
        },
        nextCol: {
            message: "The right arrow should increase the focused column.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedCol: 2 }},
            eventCode: "ArrowRight",
            pathToCheck: "model.focusedCol",
            expectedValue: 3
        },
        nextColWrap: {
            message: "The right arrow should wrap around from the last column to the first.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedCol: 4 }},
            eventCode: "ArrowRight",
            pathToCheck: "model.focusedCol",
            expectedValue: 0
        },
        previousRow: {
            message: "The up arrow key should decrease the focused row.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedRow: 2 }},
            eventCode: "ArrowUp",
            pathToCheck: "model.focusedRow",
            expectedValue: 1
        },
        previousRowWrap: {
            message: "The up arrow key should wrap around from the first row to the last.",
            componentOptions: { rowDefs: simulatedGrid,  model: { focusedRow: 0 }},
            eventCode: "ArrowUp",
            pathToCheck: "model.focusedRow",
            expectedValue: 4
        },
        nextRow: {
            message: "The down arrow should increase the focused row.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedRow: 1 }},
            eventCode: "ArrowDown",
            pathToCheck: "model.focusedRow",
            expectedValue: 2
        },
        nextRowWrap: {
            message: "The down arrow should wrap around from the last row to the first.",
            componentOptions: { rowDefs: simulatedGrid, model: { focusedRow: 4 }},
            eventCode: "ArrowDown",
            pathToCheck: "model.focusedRow",
            expectedValue: 0
        }
    };

    fluid.registerNamespace("osk.tests");
    osk.tests.createFakeEvent = function (eventCode) {
        return fluid.extend({ preventDefault: function () {}}, {code: eventCode});
    };

    fluid.each(arrowNavigationTestsDefs, function (arrowNavigationTestDef) {
        jqUnit.test(arrowNavigationTestDef.message, function () {
            jqUnit.expect(1);
            var component = osk.keyboard("#qunit-tests", arrowNavigationTestDef.componentOptions);
            var fakeEvent = osk.tests.createFakeEvent(arrowNavigationTestDef.eventCode);
            component.handleKeydown(fakeEvent);
            var observedValue = fluid.get(component, arrowNavigationTestDef.pathToCheck);
            jqUnit.assertEquals("The value after navigation should be as expected.", arrowNavigationTestDef.expectedValue, observedValue);
            component.destroy();
        });
    });
})(fluid, jqUnit);
