const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

import {
  getCurrentUserFromDb,
  handleUpdateUserSubscriptionStatus,
} from "../../../lib/authFunctions";

export default async function handler(req, res) {
  try {
    const uid = req.query.id;

    const user = await getCurrentUserFromDb(uid);

    const subscription = await stripe.subscriptions.list({
      customer: user.stripe_customerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });
    await handleUpdateUserSubscriptionStatus(subscription.data[0], uid);

    res.status(200).json({
      data: {
        status: "Sucessfull",
        id: subscription.data[0].id,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
}
