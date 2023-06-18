"use client";

import React, {
  Button,
  Form,
  Input,
  InputNumber,
} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastControl } from "lib/toastControl";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [form] = Form.useForm();

  const [cookies] = useCookies(["zayatoken"]);
  const {
    loginUser,
    isLogin,
    error,
    loading,
    checkToken,
    notification,
    forgetPassword,
    isPassword, 
    clear,
    phoneCheck,
    code,
  } = useAuthContext();

  const onFinishFailed = (errorInfo) => {
    // toastControl("error", errorInfo);
  };

  const onFinish = async (values) => {
    await loginUser(values);
  };

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
    form.validateFields().then((values) => {
      forgetPassword(values)
    }).catch((error) => console.log(error))
  };

  useEffect(() => {
    if (isLogin) {
      redirect("/userprofile");
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      redirect("/userprofile");
    }
  }, [isLogin]);

  useEffect(() => {
    toastControl("error", error);
  }, [error]);

  useEffect(() => {
    toastControl("success", notification);
  }, [notification]);

  useEffect(() => {
    if (cookies.zayatoken) {
      checkToken(cookies.zayatoken);
    }
  }, [cookies]);

  useEffect(() => {
    if(isPassword === true){
      redirect('/login');
      clear();
    }
  },[isPassword])

  return (
    <>
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
                  loading={loading}
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
                  loading={loading}
                  className="loginBtn"
                  onClick={handleChangePassword}
                >
                  Нууц үгээ солих
                </Button>
              </Form.Item>
            )}
          </Form>
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
        </div>
      </section>
    </>
  );
}
