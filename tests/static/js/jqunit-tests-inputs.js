/* globals jqUnit */
(function (fluid, jqUnit) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    jqUnit.module("Tests for custom text input.");

    var testDefs = {
        addCharToBeginning: {
            message: "We should be able to add a character at the beginning of the string.",
            componentOptions: {
                model: {
                    afterCursor: "hump",
                    beforeCursor: "",
                    composition: "hump",
                    cursorIndex: 0
                }
            },
            invoker: "addChar",
            invokerArgs: ["t"], // charToAdd, isInsert
            expected: {
                afterCursor: "hump",
                beforeCursor: "t",
                composition: "thump",
                cursorIndex: 1
            }
        },

        addCharToMiddle: {
            message: "We should be able to add a character in the middle of the string.",
            componentOptions: {
                model: {
                    afterCursor: "ks",
                    beforeCursor: "wo",
                    composition: "woks",
                    cursorIndex: 2
                }
            },
            invoker: "addChar",
            invokerArgs: ["r"], // charToAdd, isInsert
            expected: {
                afterCursor: "ks",
                beforeCursor: "wor",
                composition: "works",
                cursorIndex: 3
            }
        },

        addCharToEnd: {
            message: "We should be able to add a character at the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "",
                    beforeCursor: "works",
                    composition: "works",
                    cursorIndex: 5
                }
            },
            invoker: "addChar",
            invokerArgs: ["!"], // charToAdd, isInsert
            expected: {
                afterCursor: "",
                beforeCursor: "works!",
                composition: "works!",
                cursorIndex: 6
            }
        },

        addCharWithInsert: {
            message: "We should be able to replace a character when insert mode is active.",
            componentOptions: {
                model: {
                    afterCursor: "led",
                    beforeCursor: "fi",
                    composition: "filed",
                    cursorIndex: 2
                }
            },
            invoker: "addChar",
            invokerArgs: ["x", true], // charToAdd, isInsert
            expected: {
                afterCursor: "ed",
                beforeCursor: "fix",
                composition: "fixed",
                cursorIndex: 3
            }
        },

        moveCursorForwardFromStart: {
            message: "We should be able to move the cursor forward from the start of the string.",
            componentOptions: {
                model: {
                    afterCursor: "future",
                    beforeCursor: "",
                    composition: "future",
                    cursorIndex: 0
                }
            },
            invoker: "moveCursor",
            invokerArgs: [1], // changeInPosition
            expected: {
                afterCursor: "uture",
                beforeCursor: "f",
                composition: "future",
                cursorIndex: 1
            }
        },

        moveCursorBackwardFromStart: {
            message: "We should not be able to move the cursor backward from the start of the string.",
            componentOptions: {
                model: {
                    afterCursor: "future",
                    beforeCursor: "",
                    composition: "future",
                    cursorIndex: 0
                }
            },
            invoker: "moveCursor",
            invokerArgs: [-1], // changeInPosition
            expected: {
                afterCursor: "future",
                beforeCursor: "",
                composition: "future",
                cursorIndex: 0
            }
        },

        moveCursorForwardFromMiddle: {
            message: "We should be able to move the cursor forward from the middle of the string.",
            componentOptions: {
                model: {
                    afterCursor: "ture",
                    beforeCursor: "fu",
                    composition: "future",
                    cursorIndex: 2
                }
            },
            invoker: "moveCursor",
            invokerArgs: [1], // changeInPosition
            expected: {
                afterCursor: "ure",
                beforeCursor: "fut",
                composition: "future",
                cursorIndex: 3
            }
        },

        moveCursorBackwardFromMiddle: {
            message: "We should be able to move the cursor backward from the middle of the string.",
            componentOptions: {
                model: {
                    afterCursor: "ure",
                    beforeCursor: "fut",
                    composition: "future",
                    cursorIndex: 3
                }
            },
            invoker: "moveCursor",
            invokerArgs: [-1], // changeInPosition
            expected: {
                afterCursor: "ture",
                beforeCursor: "fu",
                composition: "future",
                cursorIndex: 2
            }
        },

        moveCursorForwardAtEnd: {
            message: "We should not be able to move the cursor forward at the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "",
                    beforeCursor: "future",
                    composition: "future",
                    cursorIndex: 6
                }
            },
            invoker: "moveCursor",
            invokerArgs: [1], // changeInPosition
            expected: {
                afterCursor: "",
                beforeCursor: "future",
                composition: "future",
                cursorIndex: 6
            }
        },

        moveCursorForwardToEnd: {
            message: "It should be possible to move the cursor forward to the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "e",
                    beforeCursor: "futur",
                    composition: "future",
                    cursorIndex: 5
                }
            },
            invoker: "moveCursor",
            invokerArgs: [1], // changeInPosition
            expected: {
                afterCursor: "",
                beforeCursor: "future",
                composition: "future",
                cursorIndex: 6
            }
        },

        moveCursorBackwardAtEnd: {
            message: "We should be able to move the cursor backward from the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "",
                    beforeCursor: "future",
                    composition: "future",
                    cursorIndex: 6
                }
            },
            invoker: "moveCursor",
            invokerArgs: [-1], // changeInPosition
            expected: {
                afterCursor: "e",
                beforeCursor: "futur",
                composition: "future",
                cursorIndex: 5
            }
        },

        moveCursorToEnd: {
            message: "We should be able to move the cursor to the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "ver",
                    beforeCursor: "fi",
                    composition: "fiver",
                    cursorIndex: 2
                }
            },
            invoker: "moveCursorToEnd",
            invokerArgs: [],
            expected: {
                afterCursor: "",
                beforeCursor: "fiver",
                composition: "fiver",
                cursorIndex: 5
            }
        },

        moveCursorToStart: {
            message: "We should be able to move the cursor to the start of the string.",
            componentOptions: {
                model: {
                    afterCursor: "ner",
                    beforeCursor: "ten",
                    composition: "tenner",
                    cursorIndex: 3
                }
            },
            invoker: "moveCursorToStart",
            invokerArgs: [],
            expected: {
                afterCursor: "tenner",
                beforeCursor: "",
                composition: "tenner",
                cursorIndex: 0
            }
        },

        removeNextCharAtStart: {
            message: "We should be able to remove the next character at the start of the string.",
            componentOptions: {
                model: {
                    afterCursor: "trust",
                    beforeCursor: "",
                    composition: "trust",
                    cursorIndex: 0
                }
            },
            invoker: "removeNextChar",
            invokerArgs: [],
            expected: {
                afterCursor: "rust",
                beforeCursor: "",
                composition: "rust",
                cursorIndex: 0
            }
        },

        removeNextCharFromMiddle: {
            message: "We should be able to remove the next character in the middle of the string.",
            componentOptions: {
                model: {
                    afterCursor: "leat",
                    beforeCursor: "p",
                    composition: "pleat",
                    cursorIndex: 1
                }
            },
            invoker: "removeNextChar",
            invokerArgs: [],
            expected: {
                afterCursor: "eat",
                beforeCursor: "p",
                composition: "peat",
                cursorIndex: 1
            }
        },

        removeNextCharAtEnd: {
            message: "Removing the next character should have no effect when called at the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "",
                    beforeCursor: "unchanging",
                    composition: "unchanging",
                    cursorIndex: 10
                }
            },
            invoker: "removeNextChar",
            invokerArgs: [],
            expected: {
                afterCursor: "",
                beforeCursor: "unchanging",
                composition: "unchanging",
                cursorIndex: 10
            }
        },

        removePreviousCharAtStart: {
            message: "Removing the previous character should have no effect when called at the start of the string.",
            componentOptions: {
                model: {
                    afterCursor: "nothing to do",
                    beforeCursor: "",
                    composition: "nothing to do",
                    cursorIndex: 0
                }
            },
            invoker: "removePreviousChar",
            invokerArgs: [],
            expected: {
                afterCursor: "nothing to do",
                beforeCursor: "",
                composition: "nothing to do",
                cursorIndex: 0
            }
        },

        removePreviousCharFromMiddle: {
            message: "We should be able to remove the previous character in the middle of the string.",
            componentOptions: {
                model: {
                    afterCursor: " dente",
                    beforeCursor: "all",
                    composition: "all dente",
                    cursorIndex: 3
                }
            },
            invoker: "removePreviousChar",
            invokerArgs: [],
            expected: {
                afterCursor: " dente",
                beforeCursor: "al",
                composition: "al dente",
                cursorIndex: 2
            }
        },

        removePreviousCharAtEnd: {
            message: "We should be able to remove the previous character at the end of the string.",
            componentOptions: {
                model: {
                    afterCursor: "",
                    beforeCursor: "fines",
                    composition: "fines",
                    cursorIndex: 5
                }
            },
            invoker: "removePreviousChar",
            invokerArgs: [],
            expected: {
                afterCursor: "",
                beforeCursor: "fine",
                composition: "fine",
                cursorIndex: 4
            }
        }
    };

    fluid.each(testDefs, function (testDef) {
        jqUnit.test(testDef.message, function () {
            jqUnit.expect(1);
            var component = osk.inputs.text("#qunit-tests", testDef.componentOptions);
            component[testDef.invoker].apply(component, testDef.invokerArgs || []);
            jqUnit.assertLeftHand("The component model should be as expected.", testDef.expected, component.model);
            component.destroy();
        });
    });
})(fluid, jqUnit);
