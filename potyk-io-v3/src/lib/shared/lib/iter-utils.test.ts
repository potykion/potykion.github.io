import { assert, expect, test } from "vitest";
import { translateBeerQuery } from "$lib/features/beer/translate/translate";
import { zip } from "$lib/shared/lib/iter-utils";


test.each`
arr | exp
${[1, 2, 3]}|${[[1, 2], [2, 3]]}
`("zip", ({ arr, exp }) => {
  expect(zip(arr, arr.slice(1))).toStrictEqual(exp);
});