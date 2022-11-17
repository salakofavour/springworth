const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default async function handler(req, res) {
  const email = req.query.email;
  const customer = await stripe.customers.create({
    email: email,
  });

  res.json({
    id: customer.id,
  });
}
