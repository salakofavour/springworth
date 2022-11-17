import { getProductsByCategory } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const id = req.query.id;
  const products = await getProductsByCategory(id);
  res.json({ ...products });
}
