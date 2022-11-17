import { getLatest3Products } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const products = await getLatest3Products();
  res.json({ products });
}
