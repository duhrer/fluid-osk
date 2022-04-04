/* globals jqUnit */
(function (fluid, jqUnit) {
    "use strict";

    fluid.registerNamespace("fluid.tests.osk");
    fluid.tests.osk.createFakeEvent = function (eventPayload) {
        return fluid.extend({ preventDefault: function () {}}, eventPayload);
    };

    fluid.tests.osk.eventTestsForGrade = function (eventTestDefs, gradeToTest) {
        jqUnit.module("Event tests for '" + gradeToTest + "'");
        fluid.each(eventTestDefs, function (eventTestDef) {
            jqUnit.test(eventTestDef.message, function () {
                jqUnit.expect(1);
                var componentInvoker = fluid.getGlobalValue(gradeToTest);
                var componentToTest = componentInvoker("#qunit-tests", eventTestDef.keyOptions);
                var fakeEvent = fluid.tests.osk.createFakeEvent(eventTestDef.eventPayload);
                componentToTest[eventTestDef.eventInvoker](fakeEvent);
                var observedValue = fluid.get(componentToTest, eventTestDef.pathToCheck);
                jqUnit.assertEquals("The value should be as expected.", eventTestDef.expectedValue, observedValue);
                componentToTest.destroy();
            });
        });
    };

    var eventTestDefs = {
        mousedown: {
            message:       "Should respond to mousedown.",
            keyOptions:    {},
            eventInvoker:  "handleDown",
            eventPayload:  {},
            pathToCheck:   "model.isDown",
            expectedValue: true
        },
        mouseup: {
            message:       "Should respond to mouseup.",
            keyOptions:    { model: { isDown: true }},
            eventInvoker:  "handleUp",
            eventPayload:  {},
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        mousedownDeactivated: {
            message:       "Should not respond to mousedown when deactivated.",
            keyOptions:    { model: { isDeactivated: true }},
            eventInvoker:  "handleDown",
            eventPayload:  { code: "Enter" },
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        mouseupDeactivated: {
            message:       "Should not respond to mouseup when deactivated.",
            keyOptions:    { model: { isDeactivated: true, isDown: true }},
            eventInvoker:  "handleUp",
            eventPayload:  {},
            pathToCheck:   "model.isDown",
            expectedValue: true
        },
        rightKeydown: {
            message:       "Should respond to keydown.",
            keyOptions:    {},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "Enter" },
            pathToCheck:   "model.isDown",
            expectedValue: true
        },
        rightKeyup: {
            message:       "Should respond to keyup.",
            keyOptions:    { model: { isDown: true }},
            eventInvoker:  "handleKeyup",
            eventPayload:  { code: "Enter" },
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        wrongKeydown: {
            message:       "Should not respond to keydown for ignored key.",
            keyOptions:    {},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "Tab" },
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        wrongKeyup: {
            message:       "Should not respond to keyup for ignored key.",
            keyOptions:    { model: { isDown: true } },
            eventInvoker:  "handleKeyup",
            eventPayload:  { code: "Tab" },
            pathToCheck:   "model.isDown",
            expectedValue: true
        },
        rightKeydownDeactivated: {
            message:       "Should not respond to keydown when deactivated.",
            keyOptions:    { model: { isDeactivated: true } },
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "Space" },
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        rightKeyupDeactivated: {
            message:       "Should not respond to keyup when deactivated.",
            keyOptions:    { model: { isDeactivated: true } },
            eventInvoker:  "handleKeyup",
            eventPayload:  { code: "Space" },
            pathToCheck:   "model.isDown",
            expectedValue: false
        },
        latchedMouseup: {
            message:       "A latched key should not respond to mouseup.",
            keyOptions:    { latch: "once", model: { isDown: true }},
            eventInvoker:  "handleUp",
            eventPayload:  {},
            pathToCheck:   "model.isDown",
            expectedValue: true
        },

        // Arrow key handling.
        leftArrow: {
            message:       "The left arrow key should decrease the focused column.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowLeft"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 1
        },
        leftArrowWrap: {
            message:       "The left arrow key should wrap around from the first column to the last.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 0 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowLeft"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 4
        },
        rightArrow: {
            message:       "The right arrow key should increase the focused column.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowRight"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 3
        },
        rightArrowWrap: {
            message:       "The left arrow key should wrap around from the first column to the last.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 4 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowRight"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 0
        },
        upArrow: {
            message:       "The up arrow key should decrease the focused row.",
            keyOptions:    { numRows: 3, model: { focusedRow: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowUp"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 1
        },
        upArrowWrap: {
            message:       "The up arrow key should wrap around from the first row to the last.",
            keyOptions:    { numRows: 3, model: { focusedRow: 0 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowUp"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 2
        },
        downArrow: {
            message:       "The down arrow key should increase the focused row.",
            keyOptions:    { numRows: 3, model: { focusedRow: 1 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowDown"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 2
        },
        downArrowWrap: {
            message:       "The down arrow key should wrap around from the last row to the first.",
            keyOptions:    { numRows: 3, model: { focusedRow: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowDown"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 0
        }
    }


    fluid.tests.osk.eventTestsForGrade(eventTestDefs, "osk.key");

    var focusTestDefs = {
        shouldFocus: {
            message:            "The component should receive focus when the column and row are correct.",
            keyOptions:         { code: "X", col: 1, row: 2, model: { focusedCol: 1, focusedRow: 2 } },
            shouldReceiveFocus: true
        },
        wrongCol: {
            message:            "The component should not receive focus when the column is incorrect.",
            keyOptions:         { code: "Y", col: 5, row: 2, model: { focusedCol: 1, focusedRow: 2 } },
            shouldReceiveFocus: false
        },
        wrongRow: {
            message:            "The component should not receive focus when the row is incorrect.",
            keyOptions:         { code: "Z", col: 1, row: 3, model: { focusedCol: 1, focusedRow: 2 } },
            shouldReceiveFocus: false
        },
        leftOfLastColumn: {
            message:            "The last column should not receive focus when the focused column is too low.",
            keyOptions:         { rowCols: 5, code: "Z", col: 3, row: 1, model: { focusedCol: 1, focusedRow: 1 } },
            shouldReceiveFocus: false
        },
        rightOfLastColumn: {
            message:            "The last column should receive focus when the focused column is off the end of the row.",
            keyOptions:         { rowCols: 4, code: "Z", col: 3, row: 1, model: { focusedCol: 10, focusedRow: 1 } },
            shouldReceiveFocus: true
        }
    };

    jqUnit.module("Focus tests for osk.key");

    fluid.each(focusTestDefs, function (focusTestDef) {
        jqUnit.test(focusTestDef.message, function () {
            jqUnit.expect(1);
            var componentToTest = osk.key("#qunit-tests", focusTestDef.keyOptions);
            // Ordinarily this would be triggered by a model change, we simulate it by calling the same function.
            osk.key.focus(componentToTest);
            // Adapted from https://www.codegrepper.com/code-examples/javascript/jQuery+check+element+has+focus
            var hasFocus = document.activeElement.innerHTML === componentToTest.container.html();
            var testMessage = focusTestDef.shouldReceiveFocus ? "The component should be focused." : "The component should not be focused.";
            jqUnit.assertEquals(testMessage, focusTestDef.shouldReceiveFocus, hasFocus);
            componentToTest.destroy();
        });
    });

    jqUnit.module("Space key tests.");

    // osk.key.space is a mix-in, so make a test grade that mixes it in .
    fluid.defaults("osk.tests.key.space", {
        gradeNames: ["osk.key", "osk.key.space"]
    });

    var spaceKeyArrowTests = {
        // Arrow key handling.
        leftArrow: {
            message:       "The left arrow key should do nothing.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowLeft"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 2
        },
        rightArrow: {
            message:       "The right arrow key should do nothing.",
            keyOptions:    { rowCols: 5, model: { focusedCol: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowRight"},
            pathToCheck:   "model.focusedCol",
            expectedValue: 2
        },
        upArrow: {
            message:       "The up arrow key should decrease the focused row.",
            keyOptions:    { numRows: 3, model: { focusedRow: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowUp"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 1
        },
        upArrowWrap: {
            message:       "The up arrow key should wrap around from the first row to the last.",
            keyOptions:    { numRows: 3, model: { focusedRow: 0 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowUp"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 2
        },
        downArrow: {
            message:       "The down arrow key should increase the focused row.",
            keyOptions:    { numRows: 3, model: { focusedRow: 1 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowDown"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 2
        },
        downArrowWrap: {
            message:       "The down arrow key should wrap around from the last row to the first.",
            keyOptions:    { numRows: 3, model: { focusedRow: 2 }},
            eventInvoker:  "handleKeydown",
            eventPayload:  { code: "ArrowDown"},
            pathToCheck:   "model.focusedRow",
            expectedValue: 0
        }
    };

    fluid.tests.osk.eventTestsForGrade(spaceKeyArrowTests, "osk.tests.key.space");
})(fluid, jqUnit);
