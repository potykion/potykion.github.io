// https://untappd.com/user/potykion/beers

// Example output: my-beer-history.json

const parseBeer = (beerDiv) => {
    const url = beerDiv.querySelector('.label').href
    const img = beerDiv.querySelector('.label').querySelector('img').src

    const beerDetails = beerDiv.querySelector('.beer-details');
    const name = beerDetails.querySelector('.name').innerText;
    const brewery = beerDetails.querySelector('.brewery').innerText;
    const style = beerDetails.querySelector('.style').innerText;

    let rating = beerDetails.querySelector('.caps').getAttribute('data-rating');
    rating = parseFloat(rating)

    const details = beerDiv.querySelector('.details');
    let abv = details.querySelector('.abv').innerText;

    if (abv) {
        abv = parseFloat(abv.split('%')[0])
    } else {
        console.log(`No abv: ${brewery} - ${name}`)
    }

    let ibu = details.querySelector('.ibu').innerText
    ibu = parseInt(ibu.split('IBU')[0])

    const date = details.querySelector('[data-href=":recentCheckin"]').innerText;

    return {
        url,
        img,
        name,
        brewery,
        style,
        rating,
        abv,
        ibu,
        date,
    }
}

const beers = [...document.querySelectorAll(
    '.beer-item'
)].map(parseBeer)

console.log(beers)

