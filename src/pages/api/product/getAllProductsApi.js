import { getAllProductsName } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const products = await getAllProductsName();

  res.json({ products });
}
