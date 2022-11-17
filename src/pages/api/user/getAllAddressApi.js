import { getAllAddress } from "../../../lib/authFunctions";

export default async function handler(req, res) {
  const uId = req.query.uId;
  const allAddress = await getAllAddress(uId);

  res.json({ allAddress });
}
