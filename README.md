# Fluid Onscreen Keyboard

This package provides an in-browser onscreen keyboard.  The supported use cases at the moment are:

1. Enabling text input when a keyboard is not available, such as when using a gamepad to control a device.
2. Displaying a keyboard onscreen, such as when documenting key bindings or creating a typing tutor.

## Examples

To try out the onscreen keyboard, clone the repository (or install the package) and open examples/index.html in your
browser.

## Running Test

To run the tests in this package, use a command like `npm test`.  The tests in this package use
[https://github.com/fluid-project/fluid-testem](`fluid-testem`) to run browser tests.  By default these tests run in CI
mode, every supported browser you have installed will launch in turn and each run the tests.

If you want to connect a single browser to the tests and view/debug the output, use a command like:

`node node_modules/testem/testem.js --file tests/testem.js`

This will launch testem in standalone mode.  Follow the onscreen prompts to connect your preferred browser to Testem.
