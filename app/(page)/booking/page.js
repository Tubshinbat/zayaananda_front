"use client";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  message,
  Tag,
  Tooltip,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Loader from "components/Generals/Loader";
import NotFound from "components/Service/notFound";
import { useAuthContext } from "context/authContext";
import { useBookingContext } from "context/bookingContext";
import base from "lib/base";
import { useEffect, useState } from "react";
import { Suspense } from "react";

export default function Page() {
  const { serviceData, setBookingData } = useBookingContext();
  const { userData } = useAuthContext();
  const [choiseDate, setChoiseDate] = useState();
  const [form] = Form.useForm();

  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  const handleDate = (date, dateString) => {
    setChoiseDate(dateString);
  };

  const choiseTimes = () => {
    const time = [];
    for (let i = 1; i <= 12; i++) {
      time.push({
        label: i + ":00",
        value: i + ":00",
      });
    }
    return time;
  };

  const handleClick = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
        service: serviceData._id,
        userId: userData && userData._id,
      };

      setBookingData(data);
    });
  };

  useEffect(() => {
    if(userData){
      form.setFieldsValue({...userData});
    }
  },[userData])

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
                  <div className="page_detials">
                    <div className="page_detials_header">
                      <h2>Сонгосон үйлчилгээ </h2>
                    </div>
                    <div className="choise-service">
                      <div className="choise-img">
                        <img
                          src={
                            base.cdnUrl + "/150x150/" + serviceData.pictures[0]
                          }
                        />
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
                    <div className="page_detials_sub">
                      <h4> Цаг сонгох </h4>
                    </div>
                    <div className="pro-box booking-box">
                      <Form layout="vertical" form={form}>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Item
                              label="Өдөр сонгох"
                              name="date"
                              rules={[requiredRule]}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                onChange={handleDate}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-md-6">
                            <Form.Item
                              label="Цаг сонгох"
                              name="time"
                              rules={[requiredRule]}
                            >
                              <Select options={choiseTimes()}></Select>
                            </Form.Item>
                          </div>
                          <div className="col-md-12">
                            <Form.Item
                              name="bookingMsg"
                              label="Захиалгын нэмэлт тайлбар"
                              rules={[requiredRule]}
                            >
                              <TextArea
                                rows={4}
                                placeholder="Захиалгын нэмэлт тайлбар"
                                maxLength={6}
                              />
                            </Form.Item>
                          </div>
                          <div className="booking_sub">
                            <h4> Хувийн мэдээлэл </h4>
                          </div>
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
                    <p className="price-bar-sub"> Үйлчилгээ </p>
                    <ul className="service-list">
                      <li>
                        <p> {serviceData.name} </p>
                        <span>
                          {new Intl.NumberFormat().format(serviceData.price)}₮
                        </span>
                      </li>
                    </ul>
                    <div className="divider-dashed"></div>
                    <ul className="service-list">
                      <li>
                        <p> Урьдчилгаа төлбөр </p>
                        <span>
                          {new Intl.NumberFormat().format(
                            serviceData.price * 0.2
                          )}
                          ₮
                        </span>
                      </li>
                    </ul>
                  </div>
                  <button className="pay-btn" onClick={handleClick}>
                    Цаг баталгаажуулах
                  </button>
                </div>
              </div>
            </Suspense>
          </div>
        </section>
      </>
    );
  }
}
