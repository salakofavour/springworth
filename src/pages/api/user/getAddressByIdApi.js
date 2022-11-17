import { getSingleAddress } from "../../../lib/authFunctions";

export default async function handler(req, res) {
  const id = req.query.id;
  const uid = req.query.uid;
  const address = await getSingleAddress(uid, id);

  res.json({ address });
}
