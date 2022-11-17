import React from "react";

import { Navbar, Footer } from "../components";

export default function TermConditionPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-5 lg:mx-20 my-10 ">
        <h4 className="text-2xl font-medium">Term and Conditions</h4>
        <div className="flex flex-col gap-y-1 mt-5 font-medium mb-28">
          <p>
            Books posted must be the users own to post, or have express
            permission from the books owner.
          </p>
          <p>
            Springworth books is a platform for posting and buying books, any
            delivery method is agreed between the buyer and the seller.
          </p>
          <p>
            While the terms of the trade is between the buyer and the seller.
            Springworth books advices the buyer not to send payment without
            meeting with the seller and confirming the book wanted.
          </p>
          <p>No deal is confirmed till an exchange takes place.</p>
          <p>Refunds</p>
          <p>
            Refunds are not processed by Springworth books as the exchange was
            between customers.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
