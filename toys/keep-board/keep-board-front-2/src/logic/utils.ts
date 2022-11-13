const apply = <K>(obj: K, keyOrFunc: string | ((obj: K) => string)) =>
    typeof keyOrFunc === 'string'
        // @ts-ignore
        ? (obj[keyOrFunc] as string)
        : keyOrFunc(obj);

export const groupBy = <K>(items: K[], keyOrFunc: string | ((obj: K) => string)) =>
    items.reduce(
        (res, obj) => ({
            ...res,
            // @ts-ignore
            [apply(obj, keyOrFunc)]: [...(res[apply(obj, keyOrFunc)] ?? []), obj]
        }),
        {},
    );
export const zip = (keys: string[], values: any[]) => {
    let obj = {};
    // @ts-ignore
    keys.forEach((key, index) => obj[key] = values[index]);
    return obj;
}

export const makeClickableLinks = (str: string) =>
    str.replace(/(https?:\/\/\S+)/g, "<a href='$1' target='_blank'>$1</a>");

export const prettifyLinks = (str: string) => {
    return str
        .replace(/>https:\/\/www\.youtube\.com\/watch\?v=(\w+)/g, '>https://youtu.be/$1')
        .replace(/>https:\/\/music\.yandex\.ru\/album\/(\d+)\/track\/(\d+)/g, '>ya.mu/$1/$2')
        .replace(/>https?:\/\//g, '>')
        ;
};
