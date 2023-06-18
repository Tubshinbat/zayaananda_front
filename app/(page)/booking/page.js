"use client";
import BookingCart from "components/Booking/BookingCart";
import PaySide from "components/Booking/PaySide";
import Loader from "components/Generals/Loader";
import NotFound from "components/Service/notFound";
import { useBookingContext } from "context/bookingContext";
import { Suspense } from "react";

export default function Page() {
  const { serviceData } = useBookingContext();

  if (!serviceData) {
    return <NotFound />;
  } else {
    return (
      <>
        <section>
          <div className="container">
            <Suspense fallback={<Loader />}>
              <div className="row">
                <div className="col-md-8">
                  <BookingCart />
                </div>
                <div className="col-md-4">
                  <PaySide />
                </div>
              </div>
            </Suspense>
          </div>
        </section>
      </>
    );
  }
}
