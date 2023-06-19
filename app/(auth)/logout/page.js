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
import { clear } from "i/lib/inflections";

export default function Page() {
  const [cookies, removeCookie] = useCookies(["zayatoken"]);
  const { clear, logOut } = useAuthContext();

  useEffect(() => {
    removeCookie("zayatoken");
    clear();
    logOut();
    redirect("/");
  }, []);

  return <></>;
}
