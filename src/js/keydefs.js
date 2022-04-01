(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    osk.keydefsByCode = {
        AltLeft: { action: "alt", code: "AltLeft", latch: "once"},
        AltRight: { action: "alt", code: "AltRight", latch: "once"},

        // TODO: Add support for moving the cursor position within a text box or text area.
        ArrowDown: { code: "ArrowDown", label: "↓", shiftLabel: "", action: "down"},
        ArrowLeft: { code: "ArrowLeft", label: "←", shiftLabel: "", action: "left"},
        ArrowRight: { code: "ArrowRight", label: "→", shiftLabel: "", action: "right"},
        ArrowUp: { code: "ArrowUp", label: "↑", shiftLabel: "", action: "up"},

        Backquote: { code: "Backquote", label: "`", shiftLabel: "~" },
        Backslash: { code: "Backslash", label: "\\", shiftLabel: "|"},
        Backspace: { code: "Backspace", label: "Backspace", shiftLabel: "", action: "backspace"},
        BracketLeft: { code: "BracketLeft", label: "[" , shiftLabel: "{" },
        BracketRight: { code: "BracketRight", label: "]", shiftLabel: "}"},
        CapsLock: { action: "caps", code: "CapsLock", label: "capslock", shiftLabel: "", latch: "hard" },
        Comma: { code: "Comma", label: ",", shiftLabel: "<"},

        ControlLeft: {action: "control", code: "ControlLeft", latch: "once"},
        ControlRight: {action: "control", code: "ControlRight", latch: "once"},

        Delete: { code: "Delete", label: "Delete", shiftLabel: "", action: "delete"},

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

        Enter: { code: "Enter", label: "Enter", shiftLabel: "", payload: "\n"},
        Equal: { code: "Equal", label: "=", shiftLabel: "+"},

        KeyA: { code: "KeyA", label: "a", gradeNames: ["osk.key.letter"] },
        KeyB: { code: "KeyB", label: "b", gradeNames: ["osk.key.letter"] },
        KeyC: { code: "KeyC", label: "c", gradeNames: ["osk.key.letter"] },
        KeyD: { code: "KeyD", label: "d", gradeNames: ["osk.key.letter"] },
        KeyE: { code: "KeyE", label: "e", gradeNames: ["osk.key.letter"] },
        KeyF: { code: "KeyF", label: "f", gradeNames: ["osk.key.letter"] },
        KeyG: { code: "KeyG", label: "g", gradeNames: ["osk.key.letter"] },
        KeyH: { code: "KeyH", label: "h", gradeNames: ["osk.key.letter"] },
        KeyI: { code: "KeyI", label: "i", gradeNames: ["osk.key.letter"] },
        KeyJ: { code: "KeyJ", label: "j", gradeNames: ["osk.key.letter"] },
        KeyK: { code: "KeyK", label: "k", gradeNames: ["osk.key.letter"] },
        KeyL: { code: "KeyL", label: "l", gradeNames: ["osk.key.letter"] },
        KeyM: { code: "KeyM", label: "m", gradeNames: ["osk.key.letter"] },
        KeyN: { code: "KeyN", label: "n", gradeNames: ["osk.key.letter"] },
        KeyO: { code: "KeyO", label: "o", gradeNames: ["osk.key.letter"] },
        KeyP: { code: "KeyP", label: "p", gradeNames: ["osk.key.letter"] },
        KeyQ: { code: "KeyQ", label: "q", gradeNames: ["osk.key.letter"] },
        KeyR: { code: "KeyR", label: "r", gradeNames: ["osk.key.letter"] },
        KeyS: { code: "KeyS", label: "s", gradeNames: ["osk.key.letter"] },
        KeyT: { code: "KeyT", label: "t", gradeNames: ["osk.key.letter"] },
        KeyU: { code: "KeyU", label: "u", gradeNames: ["osk.key.letter"] },
        KeyV: { code: "KeyV", label: "v", gradeNames: ["osk.key.letter"] },
        KeyW: { code: "KeyW", label: "w", gradeNames: ["osk.key.letter"] },
        KeyX: { code: "KeyX", label: "x", gradeNames: ["osk.key.letter"] },
        KeyY: { code: "KeyY", label: "y", gradeNames: ["osk.key.letter"] },
        KeyZ: { code: "KeyZ", label: "z", gradeNames: ["osk.key.letter"] },

        MetaLeft: { code: "MetaLeft", label: "Meta", shiftLabel: "", latch: "once", action: "meta"},
        MetaRight: { code: "MetaRight", label: "Meta", shiftLabel: "", latch: "once", action: "meta"},

        Minus: { code: "Minus", label: "-", shiftLabel: "_"},
        Period: { code: "Period", label: ".", shiftLabel: ">"},
        Quote: { code: "Quote", label: "'", shiftLabel: "\""},
        Semicolon: { code: "Semicolon", label: ";", shiftLabel: ":"},
        ShiftLeft: { code: "ShiftLeft", label: "shift", shiftLabel: "", latch: "once", action: "shift" },
        ShiftRight: { code: "ShiftRight", label: "shift", shiftLabel: "", latch: "once", action: "shift" },
        Slash: { code: "Slash", label: "/", shiftLabel: "?"},
        Space: { code: "Space", label: "Space", shiftLabel: "", payload: " ", gradeNames: ["osk.key.wide"]},
        Tab: { code: "Tab", label: "Tab", shiftLabel: "", isDeactivated: true}
    };
})(fluid);

