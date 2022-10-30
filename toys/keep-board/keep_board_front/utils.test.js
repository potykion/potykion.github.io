import {assert, test, expect} from 'vitest';
import {prettifyLinks} from "./utils";

test('prettify links', () => {
    expect(prettifyLinks('<a href="https://www.youtube.com/watch?v=1_0AYQkLqAA">https://www.youtube.com/watch?v=1_0AYQkLqAA</a>')).toBe('<a href="https://www.youtube.com/watch?v=1_0AYQkLqAA">youtu.be/1_0AYQkLqAA</a>');
    expect(prettifyLinks('<a class="link" href="https://www.youtube.com/watch?v=fBwlncaF9zs" target="_blank">https://www.youtube.com/watch?v=fBwlncaF9zs</a>')).toBe('<a class="link" href="https://www.youtube.com/watch?v=fBwlncaF9zs" target="_blank">youtu.be/fBwlncaF9zs</a>');

    expect(prettifyLinks('<a href="https://trello.com/c/wNDKBGWG">https://trello.com/c/wNDKBGWG</a>')).toBe('<a href="https://trello.com/c/wNDKBGWG">trello.com/c/wNDKBGWG</a>')
});