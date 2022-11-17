import { getProductsByCategoryNextBatch } from "../../../lib/getProductsFunctions";

export default async function handler(req, res) {
  const category = req.query.id;
  const { startFrom } = req.query;

  if (startFrom === "0") {
    return res.json(null);
  }

  if (category) {
    const products = await getProductsByCategoryNextBatch(category, startFrom);
    res.status(200).json({ ...products, count: products?.count });
  } else {
    res.json({ nothing: "rbj" });
  }
}
