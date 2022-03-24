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

        KeyA: { code: "KeyA", label: "A", shiftLabel: "" },
        KeyB: { code: "KeyB", label: "B", shiftLabel: "" },
        KeyC: { code: "KeyC", label: "C", shiftLabel: "" },
        KeyD: { code: "KeyD", label: "D", shiftLabel: "" },
        KeyE: { code: "KeyE", label: "E", shiftLabel: "" },
        KeyF: { code: "KeyF", label: "F", shiftLabel: "" },
        KeyG: { code: "KeyG", label: "G", shiftLabel: "" },
        KeyH: { code: "KeyH", label: "H", shiftLabel: "" },
        KeyI: { code: "KeyI", label: "I", shiftLabel: "" },
        KeyJ: { code: "KeyJ", label: "J", shiftLabel: "" },
        KeyK: { code: "KeyK", label: "K", shiftLabel: "" },
        KeyL: { code: "KeyL", label: "L", shiftLabel: "" },
        KeyM: { code: "KeyM", label: "M", shiftLabel: "" },
        KeyN: { code: "KeyN", label: "N", shiftLabel: "" },
        KeyO: { code: "KeyO", label: "O", shiftLabel: "" },
        KeyP: { code: "KeyP", label: "P", shiftLabel: "" },
        KeyQ: { code: "KeyQ", label: "Q", shiftLabel: "" },
        KeyR: { code: "KeyR", label: "R", shiftLabel: "" },
        KeyS: { code: "KeyS", label: "S", shiftLabel: "" },
        KeyT: { code: "KeyT", label: "T", shiftLabel: "" },
        KeyU: { code: "KeyU", label: "U", shiftLabel: "" },
        KeyV: { code: "KeyV", label: "V", shiftLabel: "" },
        KeyW: { code: "KeyW", label: "W", shiftLabel: "" },
        KeyX: { code: "KeyX", label: "X", shiftLabel: "" },
        KeyY: { code: "KeyY", label: "Y", shiftLabel: "" },
        KeyZ: { code: "KeyZ", label: "Z", shiftLabel: "" },

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
