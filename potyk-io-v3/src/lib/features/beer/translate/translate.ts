import { beerDict, type Definition, type Translation } from "$lib/entities/beer/tool/beer-dict";


export function translateBeerQuery(beerQuery: string): Translation {
  const tokens = beerQuery.split(" ");

  return tokens.map(
    t => {
      const tProcessed = t.toLowerCase();

      const def =
        // @ts-ignore
        (beerDict[tProcessed] as Definition | undefined) ??
        Object.values(beerDict).find(
          d => d.synonyms?.includes(tProcessed) ?? false
        );
      if (!def) {
        return null;
      }

      return { key: t, def: def.def };
    }
  ).filter(v => !!v) as Translation;
}