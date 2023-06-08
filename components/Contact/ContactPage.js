"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
const { TextArea } = Input;
import "react-toastify/dist/ReactToastify.css";

import { toastControl } from "lib/toastControl";
import { contactAdd } from "lib/faq";

const ContactPage = ({ webInfo }) => {
  const [form] = Form.useForm();
  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  const handleAdd = async (values) => {
    const { success, error } = await contactAdd(values);

    if (success) {
      toastControl("success", success);
      form.resetFields();
    }
    if (error) {
      toastControl("error", error);
    }
  };

  return (
    <>
      <section className="section ">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contactInfos ">
                <div className="contactInfo">
                  <i className="fas fa-map-marker-alt " />
                  <p>{webInfo.address}</p>
                </div>

                <div className="contactInfo">
                  <i className="fas fa-phone  " />
                  <p>
                    <a href={`tel:${webInfo.phone}`}> {webInfo.phone}</a>
                  </p>
                </div>

                <div className="contactInfo">
                  <i className="fas fa-envelope" />
                  <p>
                    <a href={`tel:${webInfo.email}`}> {webInfo.email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <Form layout="vertical" className="form__contact" form={form}>
                <div className="row">
                  <div className="col-6">
                    <Form.Item
                      label="Төрөл"
                      name="type"
                      rules={[requiredRule]}
                      hasFeedback
                    >
                      <Select
                        options={[
                          { label: "Санал", value: "Санал" },
                          { label: "Хүсэлт", value: "Хүсэлт" },
                          { label: "Талархал", value: "Талархал" },
                          { value: "Гомдол", label: "Гомдол" },
                        ]}
                        placeholder="Сайтын хуудасны нэр оруулна уу"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      label="Нэр"
                      name="fullName"
                      rules={[requiredRule]}
                      hasFeedback
                    >
                      <Input placeholder="Таны нэр эсвэл компаний нэрээ оруулна уу" />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      label="Имэйл"
                      rules={[
                        {
                          type: "email",
                          message: "Имэйл хаягаа оруулна уу",
                        },
                      ]}
                      name="email"
                      hasFeedback
                    >
                      <Input placeholder="Имэйл хаягаа оруулна уу" />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      label="Холбоо барих дугаар"
                      name="phone"
                      hasFeedback
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Холбоо барих дугаараа оруулна уу"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <Form.Item
                      label="Гарчиг"
                      name="name"
                      rules={[requiredRule]}
                      hasFeedback
                    >
                      <Input placeholder="Санал хүсэлтийн толгой гарчиг оруулна уу" />
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <Form.Item
                      label="Санал хүсэлт"
                      name="question"
                      rules={[requiredRule]}
                      hasFeedback
                    >
                      <TextArea rows={3} />
                    </Form.Item>
                  </div>
                  <div className="contact__btn_box">
                    <Button
                      key="submit"
                      htmlType="submit"
                      className="add-button"
                      onClick={() => {
                        form
                          .validateFields()
                          .then((values) => {
                            handleAdd(values);
                          })
                          .catch((info) => {
                            // console.log(info);
                          });
                      }}
                    >
                      Санал хүсэлт илгээх
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div
            style={{
              height: "400px",
              width: "100%",
              padding: "10px",
              boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
            }}
          >
            <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
              <Map
                latitude={47.90546848990689}
                longitude={106.92063051742029}
              ></Map>
            </Wrapper>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: 47.91599393612535, lng: 106.89541829162692 },
    map: map,
  });

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default ContactPage;
