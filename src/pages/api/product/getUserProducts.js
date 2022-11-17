import { getUserProuducts } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const id = req.query.id;
  const products = await getUserProuducts(id);
  res.json({ products });
}
