import {assert, test, expect} from 'vitest';
import {prettifyLinks} from "./utils";

test('prettify links', () => {
    expect(prettifyLinks('<a href="https://www.youtube.com/watch?v=1_0AYQkLqAA">https://www.youtube.com/watch?v=1_0AYQkLqAA</a>')).toBe('<a href="https://www.youtube.com/watch?v=1_0AYQkLqAA">yt/1_0AYQkLqAA</a>');
    expect(prettifyLinks('<a href="https://music.yandex.ru/album/20810217/track/99553974">https://music.yandex.ru/album/20810217/track/99553974</a>')).toBe('<a href="https://music.yandex.ru/album/20810217/track/99553974">ya.mu/20810217/99553974</a>');
    expect(prettifyLinks('<a href="https://vc.ru/services/526650">https://vc.ru/services/526650</a>')).toBe('<a href="https://vc.ru/services/526650">vc/526650</a>');
    expect(prettifyLinks('<a href="https://soundcloud.com/stvolrecords/stvoltv-any-act-300722">https://soundcloud.com/stvolrecords/stvoltv-any-act-300722</a>')).toBe('<a href="https://soundcloud.com/stvolrecords/stvoltv-any-act-300722">sc/stvolrecords/stvoltv-any-act-300722</a>');
    expect(prettifyLinks('<a href="https://trello.com/c/wNDKBGWG">https://trello.com/c/wNDKBGWG</a>')).toBe('<a href="https://trello.com/c/wNDKBGWG">trello.com/c/wNDKBGWG</a>')
});