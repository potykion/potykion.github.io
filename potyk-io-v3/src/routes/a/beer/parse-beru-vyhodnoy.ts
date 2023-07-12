import type { Beer } from "$lib/logic/beer/beer";

/**
 * https://beruvyhodnoy.ru/stock/index.html?id=321215
 */
export function parseBeruVyhodnoy(doc: Document) {
    let lastCountry = '';

    let beers: Beer[] = [];

    [...doc.querySelectorAll('#bottles tr')].forEach(
        row => {
            const isCountry = row.innerHTML.includes('class="header"')
            if (isCountry) {
                lastCountry = (row as HTMLElement).innerText
                return
            }

            const isBeer = row.classList.contains("h")
            if (isBeer) {
                const beer = { ...parseBeerRow(row as HTMLElement), country: lastCountry }
                beers.push(beer);
                return
            }
        }

    )

    return beers;
}

// const beers = [...document.querySelectorAll('#bottles tr.h')].map(parseBeerRow)

function parseBeerRow(row: HTMLElement): Exclude<Beer, "country"> {
    const keys = ["number", "title", "type", "og", "abv", "brewery", "price"];
    const values = [...row.querySelectorAll('td')].map(el => el.innerText);
    let rawBeer = Object.fromEntries(keys.map((k, i) => [k, values[i]]));

    return {
        ...rawBeer,
        price: parseInt(rawBeer.price.slice(0, -1)), // "231₽" > 231
        abv: parseFloat(rawBeer.abv),
        og: parseInt(rawBeer.og),
        number: parseInt(rawBeer.number),
    } as Exclude<Beer, "country">;
}
