import { assert, expect, test } from "vitest";
import { translateBeerQuery } from "$lib/features/beer/translate/translate";


test.each`
query | translation
${"Hazelnut Stout"}|${[{ key: "Hazelnut", def: "С запахом/нотками ореха" }, { key: "Stout", def: "Темный пивас на основе жженого солода"}]}
${"ореховый стаут"}|${[{ key: "ореховый", def: "С запахом/нотками ореха" }, { key: "стаут", def: "Темный пивас на основе жженого солода"}]}
`("translate beer query", ({ query, translation }) => {
  expect(translateBeerQuery(query)).toStrictEqual(translation);
});