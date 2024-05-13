import json
from collections import Counter, defaultdict
from itertools import groupby
from typing import cast

with open('beer_db.json', encoding='utf-8') as f:
    breweries = json.load(f)

found_brewery = next(
    (
        brewery
        for brewery in breweries
        # if 'jaws' in cast(str, brewery['brewery']['title']).lower()
        # if 'Ayinger'.lower() in cast(str, brewery['brewery']['title']).lower()
        # if 'velka' in cast(str, brewery['brewery']['title']).lower()
        # if 'salden' in cast(str, brewery['brewery']['title']).lower()
        if 'schneider' in cast(str, brewery['brewery']['title']).lower()
        # if 'Abbaye Notre-Dame de'.lower() in cast(str, brewery['brewery']['title']).lower()
    )
)

styles = defaultdict(lambda : 0)

for style, beers in groupby(sorted(found_brewery['beers'], key=(by_style:=lambda beer: beer['style'])), by_style):
    styles[style] += sum((beer['ratingAmount'] for beer in beers))

styles = Counter(styles).most_common(20)

print(styles)

for style, _ in styles:
    print(style)


s = 'as'