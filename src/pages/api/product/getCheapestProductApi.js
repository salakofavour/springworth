import { getChepestProduct } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const product = await getChepestProduct();
  res.json({ product });
}
