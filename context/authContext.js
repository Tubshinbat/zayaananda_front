"use client";

import axios from "axios-base";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

const errorRender = (error) => {
  let resError = "Алдаа гарлаа дахин оролдоно уу";

  if (error.message) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [cookies, removeCookie] = useCookies(["zayatoken"]);
  const [isChange, setIsChange] = useState(false);
  const [code, setCode] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const clear = () => {
    setLoading(false);
    setError(null);
    setNotification(null);
    setIsPassword(false);
    setIsChange(false);
  };

  const userChangePassword = (data) => {
    setLoading(true);
    axios
      .post("users/userdata", data)
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false);
        setIsChange(true);
      })
      .catch((error) => {
        setError(errorRender(error));
      });
    clear();
  };

  const userInfoChange = (values) => {
    setLoading(true);
    axios
      .put("users/userdata", values)
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false);
        setIsChange(true);
      })
      .catch((error) => {
        setError(errorRender(error));
      });
    clear();
  };

  const getUser = (token) => {
    setLoading(true);
    axios
      .get(`users/userdata`, {
        withCredentials: true,
        headers: { Cookie: `zayatoken=${token}` },
      })
      .then((res) => {
        setUserData(() => res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(errorRender(error));
      });
  };

  const loginUser = (data) => {
    setLoading(true);
    axios
      .post("users/login", data)
      .then((result) => {
        setUserData(result.data.user);
        setNotification("Амжилттай нэвтэрлээ");
        setIsLogin(true);
      })
      .catch((error) => {
        setError(errorRender(error));
      });
  };

  const userRegister = (formData) => {
    setLoading(true);
    axios
      .post("users/register", formData)
      .then((result) => {
        setNotification("Бүртгэл амжилттай хийгдлээ");
      })
      .catch((error) => setError(errorRender(error)));
  };

  const phoneCheck = async (phoneNumber) => {
    setLoading(true);

    axios
      .post("users/forgot-password", phoneNumber)
      .then((result) => {
        setNotification(
          "Бүртгэлтэй утасны дугаарлуу баталгаажуулах код илгээлээ "
        );
        setCode(true);
      })
      .catch((error) => {
        setError(errorRender(error));
      });

    clear();
  };

  const forgetPassword = (body) => {
    axios
      .post("users/reset-password", body)
      .then((result) => {
        setNotification("Нууц үг амжилттай солигдлоо");
        setIsPassword(true);
      })
      .catch((error) => setError(errorRender(error)));

    clear();
  };

  const logOut = () => {
    removeCookie("zayatoken");
    setIsLogin(false);
    clear();
  };

  const checkToken = (token) => {
    axios
      .post("users/checktoken", {
        withCredentials: true,
        headers: { Cookie: `zayatoken=${token}` },
      })
      .then((result) => {
        setIsLogin(true);
        setUserData(result.data.user);
      })
      .catch((error) => {
        setIsLogin(false);
        logOut();
        setError(errorRender(error));
      });
  };

  useEffect(() => {
    clear();
  }, [error, notification]);

  return (
    <AuthContext.Provider
      value={{
        error,
        loading,
        isLogin,
        userData,
        notification,
        isPassword,
        setIsPassword,
        clear,
        getUser,
        checkToken,
        loginUser,
        userRegister,
        userChangePassword,
        userInfoChange,
        isChange,
        setIsLogin,
        forgetPassword,
        logOut,
        phoneCheck,
        code,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);