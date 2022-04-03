# The `osk.keyboard` Component

A keyboard component consists of one or more rows (see below) of [keys](key.md).

## Component Options

| Option             | Description | Default Value |
| ------------------ | ----------- | ------------- |
| `markup.container` | The markup for the keyboard, into which the markup for child components will be inserted. | An empty div that all rows will be added to. |
| `model`            | See below for details. | |
| `rowDefs`          | An array of key definitions representing the keys in this row.  See below for details. | An empty array |
| `maxCols`          | The maximumum number of columns in all of the rows. | The length of the longest row in `rowDefs`. |

### Row Definitions

A keyboard creates one or more rows of keys based on the "row definitions" found in its `rowDefs` option.  Row
definitions are simply an array of key definitions (see below), appearing in the order they will be created
and rendered.

### Model Variables

| Variable      | Description | Default Value |
| ------------- | ----------- | ------------- |
| `downKeys`    | A map, keyed by key code, indicating which keys are currently held down. | An empty object. |
| `focusedCol`  | The column that should receive focus. | `false` (so that no key has focus) |
| `focusedRow`  | The column that should receive focus. | `false` (so that no key has focus) |
| `latchedKeys` | A map, keyed by key code, indicating which "latched" keys (for example, caps lock) are currently active. | An empty object. |

## Component Events

### `{osk.keyboard}.events.onAction`

A rollup event for all `onAction` events triggered by a key that is part of this keyboard.  See
[the key component's documentation](key.md) for more details.

## The `osk.row` Component

A row is a grouping component that represents a single horizontal row of keys in a keyboard.

### Component Options

| Option             | Description | Default Value |
| ------------------ | ----------- | ------------- |
| `keyDefs`          | An array of key definitions (see below). | An empty array. |
| `rowCols`          | The number of columns (keys) in this row. | Defaults to the length of `keyDefs`. |
| `markup.container` | The markup for the row, into which the markup for child components will be inserted. | An empty div that all keys will be added to. |
| `maxCols`          | The maximum number of columns, to support grid-based navigation between rows. | Defaults to the length of `keyDefs`. |
| `model`            | See below for a description of the model variables used by this component. | |

#### A Key Definition

A row creates one or more key components based on whatever "key definitions" are found in its `keyDefs` option.  A
key definition represents a subset of the supported options for a [key component](key.md).  The support options for a
single key are:

| Key             | Description |
| --------------- | ----------- |
| `action`        | The action that should be performed when this key is pressed. |
| `code`          | The key code, for example `Enter`. |
| `gradeNames`    | An array of component grades that should be mixed in to the "key". |
| `isDeactivated` | Whether this key is deactivated. |
| `label`         | The textual label that should appear on the key. |
| `latch`         | If this is unset or `false`, the key will be released immediately.  If this is set to `once`, the key will remain down until the next non-latched key is pressed.  If this is set to `hard`, the key will remain down until it is clicked again. |
| `capsPayload`   | For text keys, the payload that should be transmitted when the caps lock key is held. |
| `payload`       | For text keys, the payload that should be transmitted when the key is pressed and neither shift nor caps lock are held. |
| `shiftLabel`    | The textual label that should appear on the key indicating the value when `Shift` is active. |
| `shiftPayload`  |  For text keys, the payload that should be transmitted when the shift key is held. |

#### Model Variables

| Variable  | Description | Default Value |
| --------- | ----------- | ------------- |
| downKeys  | A map, keyed by key code, indicating which keys are currently held down. | An empty object. |

### Component Events

#### `{osk.keyboard}.events.onAction`

When a key is "pressed", it fires this event with an "action definition" that represents what should take
place as a result of the key being pressed.  The most basic example is entering a single character of text, but actions
can also include moving the text cursor and removing existing characters. See the
[key component's documentation](key.md) for more information about action definitions.

To respond to the keys pressed on the onscreen keyboard, your component should listen for this event.  See the examples
in this repository for more information.
