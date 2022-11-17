import { getCurrentUserFromDb } from "../../../lib/authFunctions";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default async function handler(req, res) {
  const userId = req.query.userId;
  const user = await getCurrentUserFromDb(userId);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PLAN,
          quantity: 1,
        },
      ],
      customer: user.stripe_customerId,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/payment-status/sucess`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/redirect`,
    });
    //console.log(session);
    res.json(session.url);
  } catch (err) {
    console.log(err.message);
  }
}
