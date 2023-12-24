# Compatible Inputs

UI triggered events such as key presses are typically flagged as "trusted" and allowed to do things like enter text in
a form input or scroll a text area.  This package listens for one type of events (such as a key press or click on an
onscreen key), and would like to send the desired key press to another element.  However, because it's not possible to
create a trusted event, form inputs simply ignore any keyboard events we create.  There are a number of ways of working
around this.

## Using This Package with Native HTML Form Elements

The first strategy is to listen for key presses and update the value of a text input, as demonstrated in the "text
input" example included with this package.  This approach supports simple typing and backspacing, but does not support
things like using arrow keys to move a cursor through the text, so that updates can take place somewhere other than at
the end of the string.  Even if we were to track a cursor position internally, there is no way to present that onscreen,
so the user would have no idea of where they are typing (or backspacing, or deleting) within a text input or textarea.

## `osk.inputs.text`

To work around these limitations, this package provides a component that is meant to be used instead of a text input.
This component is meant to support editing a single line of text. See the "OSK text input" example in this package
for a working demonstration of the component.

### Component Options

| Option             | Description | Default Value |
| ------------------ | ----------- | -------------- |
| `markup.container` | The markup for the component, into which the markup for child components will be inserted. | A div containing three sub-divs, one for the text before the cursor, one for the cursor, and one for the text after the cursor. |

#### Model Variables

| Variable       | Description |
| -------------- | ----------- |
| `afterCursor`  | The text that currently appears after the cursor. |
| `beforeCursor` | The text that currently appears before the cursor. |
| `composition`  | The complete string of text that has been entered so far. |
| `cursorIndex`  | The position of the text cursor. |

### Component Invokers

#### `{osk.inputs.text}.addChar(toAdd)`

Add `toAdd` at the cursor position.

#### `{osk.inputs.text}.moveCursor(change)`

Move the cursor `change` steps away from the current position.

#### `{osk.inputs.text}.moveCursorToEnd()`

Move the cursor to the end of the composition.

#### `{osk.inputs.text}.moveCursorToStart()`

Move the cursor to the start of the composition.

#### `{osk.inputs.text}.removeNextChar()`

Remove the character after the cursor.

#### `{osk.inputs.text}.removePreviousChar()`

Remove the character before the cursor.

### Component Events
