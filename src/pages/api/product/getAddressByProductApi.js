import { getAddressByProduct } from "../../../lib/authFunctions";

export default async function handler(req, res) {
  const id = req.query.id;
  const address = await getAddressByProduct(id);
  res.json({ address });
}
