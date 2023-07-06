"use client";

import React, { Button, Form, Input, InputNumber } from "antd";
import Link from "next/link";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { toastControl } from "lib/toastControl";
import { redirect } from "next/navigation";
import { useNotificationContext } from "context/notificationContext";

export default function Page() {
  const [form] = Form.useForm();
  const {
    forgetPassword,
    isPassword,
    phoneCheck,
    code,
    setCode,
    setIsPassword,
  } = useAuthContext();

  const { contentLoad } = useNotificationContext();

  const onFinishFailed = (errorInfo) => {
    // toastControl("error", errorInfo);
  };

  useEffect(() => {
    return () => {
      setCode(false);
      setIsPassword(false);
    };
  }, []);

  useEffect(() => {
    if (isPassword === true) {
      redirect("/login");
    }
  }, [isPassword]);

  const onFinish = async (values) => {};

  const handleNext = () => {
    if (!code) {
      const phoneNumber = form.getFieldValue("phoneNumber");
      if (!phoneNumber) {
        toastControl("error", "Утасны дугаараа оруулна уу");
      } else {
        phoneCheck({ phoneNumber });
      }
    }
  };

  const handleChangePassword = () => {
    form
      .validateFields()
      .then((values) => {
        forgetPassword(values);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          background: `url(/images/header.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2> Нууц үгээ мартсан </h2>
          <div className="bread">
            <li>
              <Link href="/"> Нүүр </Link>
            </li>
            <span> /</span>
            <li> Нууц үгээ мартсан </li>
          </div>
        </div>
      </div>
      <section>
        <div className="login_page">
          <h4> Нууц үгээ мартсан </h4>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Та өөрийн бүртгэлтэй утасны дугаараа оруулна уу!",
                },
              ]}
              className="loginInput"
            >
              <InputNumber
                size="large"
                style={{ width: "100%", borderRadius: "2px" }}
                placeholder="Та утасны дугаараа оруулна уу"
                disabled={code}
              />
            </Form.Item>
            {code === true && (
              <>
                <Form.Item
                  className="loginInput"
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Баталгаажуулах кодоо оруулна уу!",
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    style={{ width: "100%", borderRadius: "2px" }}
                    placeholder="Баталгаажуулах кодоо оруулна уу"
                  />
                </Form.Item>{" "}
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Тус талбарыг заавал бөглөнө үү",
                    },
                  ]}
                  className="loginInput"
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    style={{ width: "100%", borderRadius: "2px" }}
                    placeholder="Нууц үгээ оруулна уу"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  className="loginInput"
                  rules={[
                    {
                      required: true,
                      message: "Тус талбарыг заавал бөглөнө үү",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "Эхний оруулсан нууц үгтэй тохирохгүй байна!"
                          )
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    style={{ width: "100%", borderRadius: "2px" }}
                    placeholder="Нууц үгээ давтан оруулна уу"
                  />
                </Form.Item>
              </>
            )}
            {code === false && (
              <Form.Item className="login-btn-box">
                <Button
                  size="large"
                  loading={contentLoad}
                  className="loginBtn"
                  onClick={handleNext}
                >
                  Үргэлжлүүлэх
                </Button>
              </Form.Item>
            )}

            {code === true && (
              <Form.Item className="login-btn-box">
                <Button
                  size="large"
                  loading={contentLoad}
                  className="loginBtn"
                  onClick={handleChangePassword}
                >
                  Нууц үгээ солих
                </Button>
              </Form.Item>
            )}
          </Form>
          <div className="login-page-register">
            Танд бүртгэл байгаа бол <Link href="/login"> энд дарна </Link> уу
          </div>
        </div>
      </section>
    </>
  );
}
