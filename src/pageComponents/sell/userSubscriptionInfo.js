import React from "react";

import moment from "moment/moment";

export default function UserSubscriptionInfo({ subscription }) {
  return (
    <div className="flex flex-col items-start gap-y-1">
      <p>Status : {subscription.status}</p>
      <p>Card last 4 digit : {subscription.paymentMethod.card.last4}</p>
      <p>
        subscription end on:{" "}
        {moment(subscription.planEnd * 1000).format(
          "dddd, MMMM Do YYYY h:mm:ss a"
        )}
      </p>
      <p>
        subscription started on :{" "}
        {moment(subscription.planStart * 1000).format(
          "dddd, MMMM Do YYYY h:mm:ss a"
        )}
      </p>
    </div>
  );
}
