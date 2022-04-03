# The `osk.key` Component

A key is a single button that responds to mouse and keyboard events by triggering an action, such as outputting a
single character, or deleting the previous character (such as with the backspace).  This page describes the range of
components available and their options.

## Component Options

| Option             | Description | Default Value |
| ------------------ | ----------- | ------------- |
| `action`           | The action that should be performed when the key is pressed. | `text` |
| `capsPayload`      | For text keys, the payload that should be transmitted when the caps lock key is held. | Is the same as `payload` by default. | The uppercase equivalent of `payload`. |
| `code`             | The key code, for example `Enter`. | `undefined` |
| `label`            | The textual label that should appear on the key. | `undefined` |
| `latch`            | If this is unset or `false`, the key will be released immediately.  If this is set to `once`, the key will remain down until the next non-latched key is pressed.  If this is set to `hard`, the key will remain down until it is clicked again. | `undefined` |
| `markup.container` | The markup for the key. | A div containing a place for the key label(s). |
| `model`            | See below for details on model variables used. | |
| `payload`          | For text keys, the payload that should be transmitted when the key is pressed and neither shift nor caps lock are held. | |
| `shiftLabel`       | The textual label that should appear on the key indicating the value when `Shift` is active. | `undefined` |
| `shiftPayload`     | For text keys, the payload that should be transmitted when the shift key is held. | The uppercase equivalent of `payload`. |

### Model Variables

| Variable        | Description | Default Value |
| --------------- | ----------- | ------------- |
| `code`          | The javascript key code for this key. | `undefined` |
| `col`           | The column in the row that this key occupies. | `undefined` |
| `downKeys`      | A map, keyed by key code, of which keys are currently held down. | An empty object. |
| `focusedCol`    | The column that currently has focus. | `false` |
| `focusedRow`    | The row that currently has focus. | `false` |
| `isDeactivated` | Whether this key is deactivated, i.e. not responding to keyboard or mouse events. |
| `isDown`        | Whether this key is currently pressed. | `false` |
| `label`         | The textual label that should appear on the key. | `undefined` |
| `payload`       | For text keys, the payload that should be transmitted when the key is pressed and neither shift nor caps lock are held. | `undefined` |
| `row`           | The row in the keyboard that this key occupies. | `undefined` |
| `shiftLabel`    | The textual label that should appear on the key indicating the value when `Shift` is active. | `undefined` |
| `shiftPayload`  | For text keys, the payload that should be transmitted when the shift key is held. | The uppercase equivalent of `payload`. | `undefined` |

## Component Invokers

### `{osk.key}.handleKeydown`

Passes `keydown` events for supported keys (`Space` or `Enter`) on to `handleDown`.

### `{osk.key}.handleKeyup`

Passes `keyup` events for supported keys (`Space` or `Enter`) on to `handleUp`.

### `{osk.key}.handleDown`

Respond to either a mouse click or key down from a supported key (`Space` or `Enter`).

### `{osk.key}.handleUp`

Respond to either releasing a key or the mouse button.

### `{osk.key}.updateFocus`

Check to see if this key should currently have focus, and if so, focus on our container.

## Component Events

### {osk.key}.events.onAction

This event is fired when the key is "pressed".  The event is fired with an "action definition" as its first and only
argument (see below).

#### Action Definitions

| Key            | Description |
| -------------- | ----------- |
| `action`       | The type of action (`text`, `backspace`), et cetera. |
| `capsPayload`  | For text events, the payload that should be transmitted if the `CapsLock` key is held. |
| `code`         | The key code for the key (for example, `BackSpace`). |
| `latch`        | Whether or not this key is "latched" (see above). |
| `payload`      | For text events, the payload that should be transmitted if the `CapsLock` key and shift keys are not held. |
| `shiftPayload` | For text events, the payload that should be transmitted if either shift key is held. |
