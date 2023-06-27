"use client";
import { Form, Input, InputNumber } from "antd";
import PayModule from "components/Pay/payModule";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import { usePayContext } from "context/payContext";
import base from "lib/base";
import { toastControl } from "lib/toastControl";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLogin, userData } = useAuthContext();
  const [form] = Form.useForm();
  const { cart, qtyChange, total, createOrder, error, invoiceData } =
    useCartContext();

  const {
    setVisible,
    visible,
    isPaid,
    qpay,
    invoice,
    error: err,
    notification,
    createQpayAndInvoice,
    init,
  } = usePayContext();

  if (isLogin === false) {
    redirect("/login");
  }

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  const handleChange = (e, index) => {
    let cloneCart = cart;
    cloneCart[index].qty = parseInt(e.target.value);
    cloneCart[index].price =
      parseInt(e.target.value) * parseInt(cloneCart[index].qtyPrice);

    qtyChange(cloneCart);
  };

  const handleClick = () => {
    form.validateFields().then((values) => {
      delete values.date;
      const data = {
        ...values,
        carts: cart,
        userId: userData && userData._id,
      };
      if (!invoiceData) {
        createOrder(data);
      }
      setVisible((bf) => (bf === true ? false : true));
    });
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

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({ ...userData });
    }
  }, [userData]);

  useEffect(() => {
    toastControl("error", (error && error) || (err && err));
  }, [error, err]);

  useEffect(() => {
    toastControl("success", notification);
  }, [notification]);

  useEffect(() => {
    createQpayAndInvoice(invoiceData);
  }, [invoiceData]);

  useEffect(() => {
    if (isPaid === true) {
      if (isLogin === true) {
        redirect("/userprofile/orders");
      } else {
        redirect("/");
      }
    }
  }, [isPaid]);

  useEffect(() => {
    init();
  }, []);

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
                        <div className="qty">
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

                        <p className="choise-service-price">
                          {new Intl.NumberFormat().format(el.price)}₮
                          <div
                            className="remove-cart-item"
                            onClick={() => handleDelete(index)}
                          >
                            {" "}
                            Устгах{" "}
                          </div>
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="booking_sub">
                  <h4> Хувийн мэдээлэл </h4>
                </div>
                <div className="pro-box booking-box">
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
                    </div>
                  </Form>
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

              <button className="pay-btn" onClick={handleClick}>
                Худалдаж авах
              </button>
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
