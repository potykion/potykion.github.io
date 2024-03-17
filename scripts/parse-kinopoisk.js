// https://www.kinopoisk.ru/user/4445656/votes/

const rawItems = [...document.querySelector('.profileFilmsList').querySelectorAll('.item')]
const items = rawItems
    .filter(item => {
        const year = item.querySelector('.date').innerText.split(',')[0].split('.')[2];
        return year === '2024'
    }).map(
        item => ({
            url: item.querySelector('.nameRus a').href,
            title: item.querySelector('.nameRus a').innerText,

        })
    )
console.log(items)