const apply = (obj, keyOrFunc) => typeof keyOrFunc === 'string'
    ? obj[keyOrFunc]
    : keyOrFunc(obj);
export const groupBy = (items, keyOrFunc) => items.reduce(
    (res, obj) => ({
        ...res,
        [apply(obj, keyOrFunc)]: [...(res[apply(obj, keyOrFunc)] ?? []), obj]
    }),
    {},
);
export const zip = (keys, values) => {
    let obj = {};
    keys.forEach((key, index) => obj[key] = values[index]);
    return obj;
}

export const makeClickableLinks = (str) =>
    str.replace(/(https?:\/\/\S+)/g, "<a href='$1' target='_blank'>$1</a>");

export const prettifyLinks = (str) => {
    return str
        .replace(/>https:\/\/www\.youtube\.com\/watch\?v=/g, '>yt/')
        .replace(/>https:\/\/music\.yandex\.ru\/album\/(\d+)\/track\/(\d+)/g, '>ya.mu/$1/$2')
        .replace(/>https?:\/\/vc.ru\/\w+\/(\d+)/, '>vc/$1')
        .replace(/>https?:\/\/vc.ru\/(\d+)/, '>vc/$1')
        .replace(/>https:\/\/soundcloud.com\//, '>sc/')
        ;
};