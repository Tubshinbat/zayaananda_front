"use client";

import React, {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Typography,
} from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toastControl } from "lib/toastControl";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";

export default function Page() {
  const [cookies] = useCookies(["zayatoken"]);
  const { userRegister, isLogin, error, loading, checkToken, notification } =
    useAuthContext();

  const onFinishFailed = (errorInfo) => {
    // toastControl("error", errorInfo);
  };

  const onFinish = async (values) => {
    await userRegister(values);
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
    if (notification != null) {
      toastControl("success", notification);
      redirect("/login");
    }
  }, [notification]);

  return (
    <>
      <section>
        <div className="login_page">
          <h4> Бүртгүүлэх </h4>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Овог нэрээ оруулна уу!",
                },
              ]}
            >
              <Input
                size="large"
                style={{ width: "100%", borderRadius: "2px" }}
                placeholder="Та овог нэрээ оруулна уу"
              />
            </Form.Item>

            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Нэрээ оруулна уу!",
                },
              ]}
            >
              <Input
                size="large"
                style={{ width: "100%", borderRadius: "2px" }}
                placeholder="Та нэрээ оруулна уу"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Утасны дугаараа оруулна уу!",
                },
              ]}
            >
              <InputNumber
                size="large"
                style={{ width: "100%", borderRadius: "2px" }}
                placeholder="Утасны дугаараа оруулна уу"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Хүйсээ сонгоно уу!",
                },
              ]}
            >
              <Radio.Group name="radiogroup" defaultValue="female">
                <Radio value="male">Эрэгтэй</Radio>
                <Radio value="female">Эмэгтэй</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Тус талбарыг заавал бөглөнө үү",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                style={{ width: "100%", borderRadius: "2px" }}
                size="large"
                placeholder="Нууц үгээ оруулна уу"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
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
                      new Error("Эхний оруулсан нууц үгтэй тохирохгүй байна!")
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
            <Form.Item className="login-btn-box">
              <Button
                loading={loading}
                size="large"
                htmlType="submit"
                className="loginBtn"
              >
                Бүртгүүлэх
              </Button>
            </Form.Item>
            <div className="login-page-register">
              Танд бүртгэл байгаа бол <Link href="/login"> энд дарна </Link> уу
            </div>
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
