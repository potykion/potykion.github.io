
export interface Beer {
    number: number;
    title: string;
    type: string;
    og: number;
    abv: number;
    brewery: string;
    price: number;
    country: string;
    rating?: number;
}


export function simplifyType(type: string) {
    if (type.includes('CIDER') || type.includes('POIRE')) {
        return 'CIDER'
    }
    if (type.includes('STOUT')) {
        return 'STOUT'
    }
    if (type.includes('PORTER')) {
        return 'PORTER'
    }
    if (type.includes('GOSE')) {
        return 'GOSE'
    }
    if (type.includes('BELGIAN') || type.includes('SPICED BEER')) {
        return 'BELGIAN ALE'
    }
    if (type.includes('IPA') || type.includes('APA') || type.includes('EXTRA SPECIAL BITTER') || type.includes('IPL')) {
        return 'IPA'
    }
    if (type.includes('FRUIT')) {
        return 'FRUIT BEER'
    }
    if (type.includes('MELOMEL') || type.includes('METHEGLIN')) {
        return 'MELOMEL'
    }
    if (type.includes('PILSNER') || type.includes('PILSENER') || type.includes('PILS')) {
        return 'PILSNER'
    }
    if (type.includes('WITBIER') || type.includes('WHEAT') || type.includes('WEIZEN')) {
        return 'WHEAT'
    }
    
    if (type.includes('LAGER') || type.includes('HELLES')) {
        return 'LAGER'
    }

    return type
}


export const beerDetails = [
    'БАН.', 'БУТ.', 'НАБОР',
    '[АКЦИЯ]', '[20]',
    'СВ.', 'СВЕТ.', 'ТЕМН.', 'Б/А', 'Б/А.',
    '0,5', '0,33', '0,44', '0.5', '0,75', '0,375', '0,45', '0,25',
    'СВ.0,33'
]

export function formatBeerTitle(beerTitle: string) {
    return beerTitle
        .split(' ')
        .map(token => beerDetails.includes(token) ? `<span class="text-neutral-300">${token}</span>` : token)
        .join(' ')
}

export function cutBeerTitle(beerTitle: string): string {
    return beerTitle
        .split(' ')
        .filter((token) => !beerDetails.includes(token))
        .join(' ');
}