import { getTop10ExpensiveProducts } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const products = await getTop10ExpensiveProducts();
  res.json({ products });
}
