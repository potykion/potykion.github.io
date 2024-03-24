// https://www.kinopoisk.ru/user/4445656/votes/list/genre/films/vs/vote/perpage/200/#list
// https://www.kinopoisk.ru/user/4445656/votes/list/genre/films/vs/vote/page/2/#list


[...document.querySelector('.profileFilmsList').querySelectorAll('.item')]
    .map(
        item => ({
            url: item.querySelector('a').href,
            title: item.querySelector('a').innerText,
            vote: item.querySelector('.myVote').innerText,
            date: item.querySelector('.date').innerText,
            nameEng: item.querySelector('.nameEng')?.innerText,
        })
    )
