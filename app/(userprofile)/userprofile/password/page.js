"use client";
import { Button, Form, Input, InputNumber, Radio } from "antd";
import { useAuthContext } from "context/authContext";
import { toastControl } from "lib/toastControl";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [cookies] = useCookies(["zayatoken"]);
  const {
    userData,
    getUser,
    userChangePassword,
    isChange,
    clear,
    notification,
    error,
  } = useAuthContext();

  const [form] = Form.useForm();
  const router = useRouter();

  const changeData = () => {
    form.validateFields().then((values) => {
      userChangePassword(values);
    });
  };

  useEffect(() => {
    getUser(cookies.zayatoken);
  }, []);

  useEffect(() => {
    if (isChange === true) {
      toastControl("success", "Нууц үг амжилттай шинэчлэгдлээ");
      clear();
      form.resetFields();
      redirect("/userprofile");
    }
  }, [isChange]);

  useEffect(() => {
    toastControl("error", error);
  }, [error]);

  useEffect(() => {
    if (notification != null) {
      toastControl("success", notification);
    }
  }, [notification]);

  return (
    <>
      {" "}
      <div className="profile-box">
        <h4> Хувийн мэдээлэл </h4>
        <div className="pro-box profile-card">
          <div className="profile-card-header">
            <h6> Нууц үг шинэчлэх </h6>
            <span>
              Сүүлд өөрчлөлт хийгдсэн {userData && userData.updateAt}{" "}
            </span>
            <div className="divider-dot"> </div>
            <Form
              name="basic"
              className="user-edit-form"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              form={form}
            >
              <div className="row">
                <div className="col-md-6">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Шинэ нууц үгээ оруулна уу!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      style={{ width: "100%", borderRadius: "2px" }}
                      placeholder="Шинэ нууц үгээ оруулна уу"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="confPassword"
                    rules={[
                      {
                        required: true,
                        message: "Баталгаажуулах нууц үгээ оруулна уу уу!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      style={{ width: "100%", borderRadius: "2px" }}
                      placeholder="Шинэ нууц үгээ баталгаажуулах"
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
            <div className="profile-card-footer">
              <button onClick={() => router.back()} className="back-btn">
                Буцах
              </button>
              <button className="change-btn" size="large" onClick={changeData}>
                Шинэчлэх
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
