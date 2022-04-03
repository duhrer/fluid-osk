(function (fluid) {
    "use strict";
    var osk = fluid.registerNamespace("osk");

    fluid.defaults("osk.keyboard.qwerty", {
        gradeNames: ["osk.keyboard"],
        rowDefs: [
            [osk.keydefsByCode.Backquote, osk.keydefsByCode.Digit1, osk.keydefsByCode.Digit2, osk.keydefsByCode.Digit3, osk.keydefsByCode.Digit4, osk.keydefsByCode.Digit5, osk.keydefsByCode.Digit6, osk.keydefsByCode.Digit7, osk.keydefsByCode.Digit8, osk.keydefsByCode.Digit9, osk.keydefsByCode.Digit0, osk.keydefsByCode.Minus, osk.keydefsByCode.Equal, osk.keydefsByCode.Backspace],
            [osk.keydefsByCode.Tab, osk.keydefsByCode.KeyQ, osk.keydefsByCode.KeyW, osk.keydefsByCode.KeyE, osk.keydefsByCode.KeyR, osk.keydefsByCode.KeyT, osk.keydefsByCode.KeyY, osk.keydefsByCode.KeyU, osk.keydefsByCode.KeyI, osk.keydefsByCode.KeyO, osk.keydefsByCode.KeyP, osk.keydefsByCode.BracketLeft, osk.keydefsByCode.BracketRight, osk.keydefsByCode.Slash],
            [osk.keydefsByCode.CapsLock, osk.keydefsByCode.KeyA, osk.keydefsByCode.KeyS, osk.keydefsByCode.KeyD, osk.keydefsByCode.KeyF, osk.keydefsByCode.KeyG, osk.keydefsByCode.KeyH, osk.keydefsByCode.KeyJ, osk.keydefsByCode.KeyK,  osk.keydefsByCode.KeyL, osk.keydefsByCode.Semicolon, osk.keydefsByCode.Quote, osk.keydefsByCode.Enter],
            [osk.keydefsByCode.ShiftLeft, osk.keydefsByCode.KeyZ, osk.keydefsByCode.KeyX, osk.keydefsByCode.KeyC, osk.keydefsByCode.KeyV, osk.keydefsByCode.KeyB, osk.keydefsByCode.KeyN, osk.keydefsByCode.KeyM, osk.keydefsByCode.Comma, osk.keydefsByCode.Period, osk.keydefsByCode.ShiftRight],
            [osk.keydefsByCode.Space]
        ]
    });

    fluid.defaults("osk.keyboard.qwertyNav", {
        gradeNames: ["osk.keyboard"],
        rowDefs: [
            [osk.keydefsByCode.Backquote, osk.keydefsByCode.Digit1, osk.keydefsByCode.Digit2, osk.keydefsByCode.Digit3, osk.keydefsByCode.Digit4, osk.keydefsByCode.Digit5, osk.keydefsByCode.Digit6, osk.keydefsByCode.Digit7, osk.keydefsByCode.Digit8, osk.keydefsByCode.Digit9, osk.keydefsByCode.Digit0, osk.keydefsByCode.Minus, osk.keydefsByCode.Equal, osk.keydefsByCode.Backspace, osk.keydefsByCode.Insert, osk.keydefsByCode.Home, osk.keydefsByCode.PageUp],

            [osk.keydefsByCode.Tab, osk.keydefsByCode.KeyQ, osk.keydefsByCode.KeyW, osk.keydefsByCode.KeyE, osk.keydefsByCode.KeyR, osk.keydefsByCode.KeyT, osk.keydefsByCode.KeyY, osk.keydefsByCode.KeyU, osk.keydefsByCode.KeyI, osk.keydefsByCode.KeyO, osk.keydefsByCode.KeyP, osk.keydefsByCode.BracketLeft, osk.keydefsByCode.BracketRight, osk.keydefsByCode.Slash, osk.keydefsByCode.Delete, osk.keydefsByCode.End, osk.keydefsByCode.PageDown],

            [osk.keydefsByCode.CapsLock, osk.keydefsByCode.KeyA, osk.keydefsByCode.KeyS, osk.keydefsByCode.KeyD, osk.keydefsByCode.KeyF, osk.keydefsByCode.KeyG, osk.keydefsByCode.KeyH, osk.keydefsByCode.KeyJ, osk.keydefsByCode.KeyK,  osk.keydefsByCode.KeyL, osk.keydefsByCode.Semicolon, osk.keydefsByCode.Quote, osk.keydefsByCode.Enter, osk.keydefsByCode.ArrowUp],

            [osk.keydefsByCode.ShiftLeft, osk.keydefsByCode.KeyZ, osk.keydefsByCode.KeyX, osk.keydefsByCode.KeyC, osk.keydefsByCode.KeyV, osk.keydefsByCode.KeyB, osk.keydefsByCode.KeyN, osk.keydefsByCode.KeyM, osk.keydefsByCode.Comma, osk.keydefsByCode.Period, osk.keydefsByCode.ShiftRight, osk.keydefsByCode.ArrowLeft, osk.keydefsByCode.ArrowDown, osk.keydefsByCode.ArrowRight],

            [osk.keydefsByCode.Space]
        ]
    });

    fluid.defaults("osk.keyboard.navigation", {
        gradeNames: ["osk.keyboard"],
        rowDefs: []
    });
})(fluid);
