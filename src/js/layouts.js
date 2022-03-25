(function (fluid) {
    "use strict";
    var keysByCode = {
        Backquote: { code: "Backquote", label: "`", shiftLabel: "~" },
        Backslash: { code: "Backslash", label: "\\", shiftLabel: "|"},
        Backspace: { code: "Backspace", label: "Backspace", shiftLabel: "", isDeactivated: true},
        BracketLeft: { code: "BracketLeft", label: "[" , shiftLabel: "{" },
        BracketRight: { code: "BracketRight", label: "]", shiftLabel: "}"},
        CapsLock: { code: "CapsLock", label: "capslock", shiftLabel: "", isDeactivated: true},
        Comma: { code: "Comma", label: ",", shiftLabel: "<"},

        Digit1: { code: "Digit1", label: "1", shiftLabel: "!"},
        Digit2: { code: "Digit2", label: "2", shiftLabel: "@"},
        Digit3: { code: "Digit3", label: "3", shiftLabel: "#"},
        Digit4: { code: "Digit4", label: "4", shiftLabel: "$"},
        Digit5: { code: "Digit5",  label: "5", shiftLabel: "%"},
        Digit6: { code: "Digit6", label: "6", shiftLabel: "^"},
        Digit7: { code: "Digit7", label: "7", shiftLabel: "&"},
        Digit8: { code: "Digit8", label: "8", shiftLabel: "*"},
        Digit9: { code: "Digit9", label: "9", shiftLabel: "("},
        Digit0: { code: "Digit0", label: "0", shiftLabel: ")"},

        Enter: { code: "Enter", label: "Enter", shiftLabel: "", isDeactivated: true},
        Equal: { code: "Equal", label: "=", shiftLabel: "+"},

        KeyA: { code: "KeyA", label: "a", shiftLabel: "A", gradeNames: ["osk.key.onlyCap"] },
        KeyB: { code: "KeyB", label: "b", shiftLabel: "B", gradeNames: ["osk.key.onlyCap"] },
        KeyC: { code: "KeyC", label: "c", shiftLabel: "C", gradeNames: ["osk.key.onlyCap"] },
        KeyD: { code: "KeyD", label: "d", shiftLabel: "D", gradeNames: ["osk.key.onlyCap"] },
        KeyE: { code: "KeyE", label: "e", shiftLabel: "E", gradeNames: ["osk.key.onlyCap"] },
        KeyF: { code: "KeyF", label: "f", shiftLabel: "F", gradeNames: ["osk.key.onlyCap"] },
        KeyG: { code: "KeyG", label: "g", shiftLabel: "G", gradeNames: ["osk.key.onlyCap"] },
        KeyH: { code: "KeyH", label: "h", shiftLabel: "H", gradeNames: ["osk.key.onlyCap"] },
        KeyI: { code: "KeyI", label: "i", shiftLabel: "I", gradeNames: ["osk.key.onlyCap"] },
        KeyJ: { code: "KeyJ", label: "j", shiftLabel: "J", gradeNames: ["osk.key.onlyCap"] },
        KeyK: { code: "KeyK", label: "k", shiftLabel: "K", gradeNames: ["osk.key.onlyCap"] },
        KeyL: { code: "KeyL", label: "l", shiftLabel: "L", gradeNames: ["osk.key.onlyCap"] },
        KeyM: { code: "KeyM", label: "m", shiftLabel: "M", gradeNames: ["osk.key.onlyCap"] },
        KeyN: { code: "KeyN", label: "n", shiftLabel: "N", gradeNames: ["osk.key.onlyCap"] },
        KeyO: { code: "KeyO", label: "o", shiftLabel: "O", gradeNames: ["osk.key.onlyCap"] },
        KeyP: { code: "KeyP", label: "p", shiftLabel: "P", gradeNames: ["osk.key.onlyCap"] },
        KeyQ: { code: "KeyQ", label: "q", shiftLabel: "Q", gradeNames: ["osk.key.onlyCap"] },
        KeyR: { code: "KeyR", label: "r", shiftLabel: "R", gradeNames: ["osk.key.onlyCap"] },
        KeyS: { code: "KeyS", label: "s", shiftLabel: "S", gradeNames: ["osk.key.onlyCap"] },
        KeyT: { code: "KeyT", label: "t", shiftLabel: "T", gradeNames: ["osk.key.onlyCap"] },
        KeyU: { code: "KeyU", label: "u", shiftLabel: "U", gradeNames: ["osk.key.onlyCap"] },
        KeyV: { code: "KeyV", label: "v", shiftLabel: "V", gradeNames: ["osk.key.onlyCap"] },
        KeyW: { code: "KeyW", label: "w", shiftLabel: "W", gradeNames: ["osk.key.onlyCap"] },
        KeyX: { code: "KeyX", label: "x", shiftLabel: "X", gradeNames: ["osk.key.onlyCap"] },
        KeyY: { code: "KeyY", label: "y", shiftLabel: "Y", gradeNames: ["osk.key.onlyCap"] },
        KeyZ: { code: "KeyZ", label: "Z", shiftLabel: "Z", gradeNames: ["osk.key.onlyCap"] },

        Minus: { code: "Minus", label: "-", shiftLabel: "_"},
        Period: { code: "Period", label: ".", shiftLabel: ">"},
        Quote: { code: "Quote", label: "'", shiftLabel: "\""},
        Semicolon: { code: "Semicolon", label: ";", shiftLabel: ":"},
        ShiftLeft: { code: "ShiftLeft", label: "shift", shiftLabel: "", isDeactivated: true},
        ShiftRight: { code: "ShiftRight", label: "shift", shiftLabel: "", isDeactivated: true},
        Slash: { code: "Slash", label: "/", shiftLabel: "?"},
        Space: { code: "Space", label: "Space", shiftLabel: "", gradeNames: ["osk.key.wide"], isDeactivated: true},
        Tab: { code: "Tab", label: "tab", shiftLabel: "", isDeactivated: true}
    };

    fluid.defaults("osk.layout.qwerty", {
        gradeNames: ["osk.layout"],
        rowDefs: [
            [keysByCode.Backquote, keysByCode.Digit1, keysByCode.Digit2, keysByCode.Digit3, keysByCode.Digit4, keysByCode.Digit5, keysByCode.Digit6, keysByCode.Digit7, keysByCode.Digit8, keysByCode.Digit9, keysByCode.Digit0, keysByCode.Minus, keysByCode.Equal, keysByCode.Backspace ],
            [keysByCode.Tab, keysByCode.KeyQ, keysByCode.KeyW, keysByCode.KeyE, keysByCode.KeyR, keysByCode.KeyT, keysByCode.KeyY, keysByCode.KeyU, keysByCode.KeyI, keysByCode.KeyO, keysByCode.KeyP, keysByCode.BracketLeft, keysByCode.BracketRight, keysByCode.Slash ],
            [keysByCode.CapsLock, keysByCode.KeyA, keysByCode.KeyS, keysByCode.KeyD, keysByCode.KeyF, keysByCode.KeyG, keysByCode.KeyH, keysByCode.KeyJ, keysByCode.KeyK,  keysByCode.KeyL, keysByCode.Semicolon, keysByCode.Quote, keysByCode.Enter],
            [keysByCode.ShiftLeft, keysByCode.KeyZ, keysByCode.KeyX, keysByCode.KeyC, keysByCode.KeyV, keysByCode.KeyB, keysByCode.KeyN, keysByCode.KeyM, keysByCode.Comma, keysByCode.Period, keysByCode.ShiftRight],
            [keysByCode.Space]
        ]
    });
})(fluid);
