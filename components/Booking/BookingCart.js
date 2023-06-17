"use client";
import { useBookingContext } from "context/bookingContext";
import base from "lib/base";

const BookingCart = () => {
  const { serviceData } = useBookingContext();
  console.log(serviceData);
  if (serviceData)
    return (
      <div className="page_detials">
        <div className="page_detials_header">
          <h2>Сонгосон үйлчилгээ </h2>
        </div>
        <div className="choise-service">
          <div className="choise-img">
            <img src={base.cdnUrl + "/150x150/" + serviceData.pictures[0]} />
          </div>
          <div className="choise-service-detials">
            <div className="choise-title">
              <span> Үйлчилгээ </span>
              <h5>{serviceData.name}</h5>
            </div>
            <p className="choise-service-price">
              {new Intl.NumberFormat().format(serviceData.price)}₮
            </p>
          </div>
        </div>
      </div>
    );
};

export default BookingCart;
