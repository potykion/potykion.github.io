/**
 * Парсит каналы с https://www.youtube.com/feed/channels
 * Выводит их в виде md-строки:
 *   [1 800 PAIN](https://www.youtube.com/channel/UCVxva5Fa5R0pxlolC2Ytpfg)
 *   [100 gecs](https://www.youtube.com/channel/UCVdlcqbM4oh0xJIQAxiaV5Q)
 *   [Adeq](https://www.youtube.com/user/EgorVoronov)
 */
console.log(
    [...document.querySelectorAll('ytd-channel-renderer')]
        .map(
            c => ({
                // https://www.youtube.com/channel/UCVqlknx5llGHCrbocuhB8jQ
                name: c.querySelector('ytd-channel-name yt-formatted-string').innerText,
                // CFNSLR
                link: c.querySelector('a').href,
            })
        )
        .map(c => `[${c.name}](${c.link})`)
        .join('\n')
)


