export function zip<T1, T2>(arr1: T1[], arr2: T2[]) {
  if (arr1.length > arr2.length) {
    return arr2.map((e, i) => [arr1[i], e]);
  } else {
    return arr1.map((e, i) => [e, arr2[i]]);
  }
}