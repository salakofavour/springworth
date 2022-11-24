import { getSellerInfo } from "../../../lib/authFunctions";

export default async function handler(req, res) {
  const uId = req.query.uId;

  if (uId) {
    const data = await getSellerInfo(uId);
    res.json({ ...data });
    return;
  }

  res.json({ data: null });
}
