import { beerDict, type Definition, type Translation } from "$lib/entities/beer/tool/beer-dict";
import { zip } from "$lib/shared/lib/iter-utils";


export function translateBeerQuery(beerQuery: string): Translation {

  let tokens = beerQuery.split(" ");
  const keys = tokens.concat(
    zip(tokens, tokens.slice(1)).map(pair => pair.join(" "))
  );

  return keys.map(
    t => {
      const tProcessed = t.toLowerCase();

      const def =
        // @ts-ignore
        (beerDict[tProcessed] as Definition | undefined) ??
        Object.values(beerDict).find(
          d => (d as Definition).synonyms?.includes(tProcessed) ?? false
        );
      if (!def) {
        return null;
      }

      return { key: t, def: def.def };
    }
  ).filter(v => !!v) as Translation;
}