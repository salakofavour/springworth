import { getProductById } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const id = req.query.id;
  const product = await getProductById(id);
  res.json({ product });
}
