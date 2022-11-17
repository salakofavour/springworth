const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

import { getCurrentUserFromDb } from "../../../lib/authFunctions";

export default async function handler(req, res) {
  const uid = req.query.id;
  const user = await getCurrentUserFromDb(uid);

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customerId,
    return_url: `${process.env.NEXT_PUBLIC_API_URL}/redirect`,
  });

  res.json({ data: portalSession.url });
}
