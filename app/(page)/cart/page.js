"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, InputNumber } from "antd";
import PayModule from "components/Pay/payModule";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import { usePayContext } from "context/payContext";
import base from "lib/base";
import { toastControl } from "lib/toastControl";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const {
    cart,
    qtyChange,
    total,
    isVerfi,
    setVerfi,
    setInfo,
    info,
    createOrder,
  } = useCartContext();
  const { visible, qpay, invoice, paymentInit, setVisible } = usePayContext();
  const { user } = useAuthContext();

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  useEffect(() => {
    paymentInit();

    return () => {
      paymentInit();
      setVerfi(false);
    };
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user });
    }
  }, [user]);

  const handleChange = (e, index) => {
    let cloneCart = cart;
    let q = 1;
    if (parseInt(e.target.value) < 0) {
      toastControl("error", "Хасах тоо өгч болохгүй");
    } else if (e.target.value === "") {
      toastControl("error", "Хоосон байж болохгүй");
    } else {
      cloneCart[index].qty = parseInt(e.target.value);
      cloneCart[index].price =
        parseInt(e.target.value) * parseInt(cloneCart[index].qtyPrice);

      qtyChange(cloneCart);
    }
  };

  const handleDelete = (index) => {
    let cloneCart = cart;
    if (cloneCart.length === 1) {
      cloneCart = [];
    } else {
      cloneCart.splice(index, 1);
    }

    qtyChange(cloneCart);
  };

  const handleVerfi = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
      };
      setInfo(data);
      setVerfi(true);
    });
  };

  const handleClick = () => {
    form.validateFields().then((values) => {
      delete values.date;
      const data = {
        ...values,
        carts: cart,
        userId: user && user._id,
      };
      if (!invoice && isVerfi == true) createOrder(data);
      setVisible(true);
    });
  };

  // useEffect(() => {
  //   createQpayAndInvoice(invoiceData);
  // }, [invoiceData]);

  // useEffect(() => {
  //   if (isPaid === true) {
  //     if (isLogin === true) {
  //       redirect("/userprofile/orders");
  //     } else {
  //       redirect("/");
  //     }
  //   }
  // }, [isPaid]);

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="page_detials">
                <div className="page_detials_header">
                  <h2> Сагсандах бүтээгдэхүүнүүд </h2>
                </div>
                {cart &&
                  cart.map((el, index) => (
                    <div className="choise-service">
                      <div className="choise-img">
                        <img src={base.cdnUrl + "/150x150/" + el.picture} />
                      </div>
                      <div className="choise-service-detials">
                        <div className="choise-title">
                          <span> Бүтээгдэхүүн </span>
                          <h5>{el.name}</h5>
                        </div>
                        <div className="cart-p-controls">
                          {isVerfi == false && (
                            <div className="cart-qty">
                              <p> Тоо ширхэг </p>
                              <input
                                type="number"
                                name="qty"
                                min="1"
                                max="100"
                                defaultValue={el.qty}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                          )}
                          <p className="choise-service-price">
                            {isVerfi == true && el.qty} x{" "}
                            {new Intl.NumberFormat().format(el.price)}₮
                          </p>
                          {isVerfi == false && (
                            <div
                              className="remove-cart-item"
                              onClick={() => handleDelete(index)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="booking_sub">
                  <h4> Хувийн мэдээлэл </h4>
                </div>
                <div className="pro-box booking-box">
                  {isVerfi === false && (
                    <Form layout="vertical" form={form}>
                      <div className="row">
                        <div className="col-md-6">
                          <Form.Item
                            name="firstName"
                            label="Нэр"
                            rules={[requiredRule]}
                          >
                            <Input
                              placeholder="Нэрээ оруулна уу"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            name="lastName"
                            label="Овог нэр"
                            rules={[requiredRule]}
                          >
                            <Input placeholder="Имэйл хаягыг оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            label="Утасны дугаар"
                            name="phoneNumber"
                            rules={[requiredRule]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              placeholder="Утасны дугаараа оруулна уу"
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-6">
                          <Form.Item
                            label="Имэйл хаяг"
                            name="email"
                            rules={[requiredRule]}
                          >
                            <Input placeholder="Имэйл хаягаа оруулна уу" />
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  )}
                  {isVerfi === true && (
                    <div className="row booking-details">
                      <div className="col-md-6">
                        <labe> Таны овог: </labe>
                        {info.lastName}
                      </div>

                      <div className="col-md-6">
                        <labe> Таны нэр: </labe>
                        {info.firstName}
                      </div>

                      <div className="col-md-6">
                        <labe> Утасны дугаар: </labe>
                        {info.phoneNumber}
                      </div>

                      <div className="col-md-6">
                        <labe> Имэйл хаяг: </labe>
                        {info.email}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="page_detials_header">
                <h2> Төлбөрийн мэдээлэл</h2>
              </div>
              <div className="price-bar">
                <p className="price-bar-sub"> Бүтээгдэхүүн </p>
                <ul className="service-list">
                  {cart &&
                    cart.map((el) => (
                      <li>
                        <p> {el.name} </p>
                        <span>{new Intl.NumberFormat().format(el.price)}₮</span>
                      </li>
                    ))}
                </ul>
                <div className="divider-dashed"></div>
                <ul className="service-list">
                  <li>
                    <p> Төлөх төлбөр </p>
                    <span>{new Intl.NumberFormat().format(total)}₮</span>
                  </li>
                </ul>
              </div>
              {isVerfi == false && (
                <button className="pay-btn" onClick={() => handleVerfi()}>
                  Баталгаажуулах
                </button>
              )}
              {isVerfi == true && (
                <>
                  <button className="pay-btn" onClick={() => handleClick()}>
                    Худалдаж авах
                  </button>
                  <button
                    className="back-btn"
                    style={{ width: "100%", marginTop: "15px" }}
                    onClick={() => {
                      paymentInit();
                      setVerfi(false);
                    }}
                  >
                    Буцах
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {visible === true && (
        <PayModule visible={visible} invoice={invoice} qpay={qpay} />
      )}
    </>
  );
}
