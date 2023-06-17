import { useBookingContext } from "context/bookingContext";

const PaySide = () => {
  const { serviceData } = useBookingContext();
  return (
    <>
      <div className="page_detials_header">
        <h2> Төлбөрийн мэдээлэл</h2>
      </div>
      <div className="price-bar">
        <p className="price-bar-sub"> Үйлчилгээ </p>
        <ul className="service-list">
          <li>
            <p> {serviceData.name} </p>
            <span> {new Intl.NumberFormat().format(serviceData.price)}₮</span>
          </li>
        </ul>
        <div className="divider-dashed"></div>
        <ul className="service-list">
          <li>
            <p> Урьдчилгаа төлбөр </p>
            <span>
              {new Intl.NumberFormat().format(serviceData.price * 0.2)}₮
            </span>
          </li>
        </ul>
      </div>
      <button className="pay-btn"> Цаг баталгаажуулах </button>
    </>
  );
};

export default PaySide;
