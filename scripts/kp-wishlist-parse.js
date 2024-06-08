// https://www.kinopoisk.ru/mykp/folders/3575/?vector=desc&limit=200

console.log(
    [...document.querySelectorAll('.info')]
        .map(
            div => div.innerText
                .split('\n')
                .map(str => str = str.replace(/[\(\))]/g, ""))
                .slice(0, 4)
                .filter((_, i) => i != 2)
                .join('<br>')
        )
        .join('\n')
)