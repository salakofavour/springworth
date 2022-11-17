import React from "react";

import { Navbar, Footer } from "../components";

export default function AboutUsPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-5 lg:mx-20 my-10">
        <h1 className="text-2xl font-medium">About Springworth Books</h1>
        <p className="py-4">
          At Springworth Books our aim is allow everyone easier access to books
          by putting the readers in control.
        </p>
        <div className="flex flex-col gap-y-4">
          <p className="font-medium">What we mean</p>
          <p>
            Sellers can anticipate the market and need for a book and decide to
            increase their price above the average.
          </p>
          <p>
            Sellers can decide to reduce their price below the average price to
            oversell their competitors.
          </p>
          <p>Sellers can also set their prices at the market price.</p>
          <p>
            With these options a buyer has a lot of options to decide from.{" "}
          </p>
          <p className=" font-medium">With a chat feature available:</p>
          <p>
            There is no rush in delivery or pickup as both the seller and buyer
            can agree on a time and place that works for them.
          </p>
          <p>
            Users (both the buyer and seller) can haggle prices to reach an
            agreement.
          </p>
          <p>
            Buyers also get to see the product as they are paying, so there is
            no payment before the book is seen.
          </p>
          <p>
            This is what Springworth Books means by putting the power in the
            hands of the user, at every step of the way you are in Control.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
