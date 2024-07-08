// https://untappd.com/user/potykion

// Example output: my-checkins.json

const parseBeer = (beerDiv) => {
    let aLabel = beerDiv.querySelector('a.label');


    const url = aLabel.href
    const comment = beerDiv.querySelector('p.comment-text').innerText
    return {url, comment}
}

const beers = [...document.querySelectorAll(
    '.checkin'
)].map(parseBeer)

console.log(beers)

