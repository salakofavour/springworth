import { sort } from "fast-sort";

export const slugify = (str) =>
  str
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function handleSort(option, products) {
  var sortProduct;
  if (option === "A-Z") {
    sortProduct = sort(products).asc((u) => u.name);

    return sortProduct;
  }
  if (option === "Z-A") {
    sortProduct = sort(products).desc((u) => u.name);

    return sortProduct;
  }
  if (option === "PRICE↑") {
    sortProduct = sort(products).desc((u) => parseInt(u.price));

    return sortProduct;
  }
  if (option === "PRICE↓") {
    sortProduct = sort(products).asc((u) => parseInt(u.price));

    return sortProduct;
  }
  if (option === "index") {
    sortProduct = sort(products).asc((u) => parseInt(u.index));

    return sortProduct;
  }
}

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
