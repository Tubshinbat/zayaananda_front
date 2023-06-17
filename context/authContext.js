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
  const [code, setCode] = useState(false);

  const clear = () => {
    setLoading(false);
    setError(null);
    setNotification(null);
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
        setUserData(result.data.data);
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

  const forgetPassword = (phoneNumber) => {
    axios
      .post("users/forgor-password", phoneNumber)
      .then((result) => {
        setNotification("Таны утасанд холбогдох баталгаажуулах код илгээллээ");
      })
      .catch((error) => setError(errorRender(error)));
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
        getUser,
        checkToken,
        loginUser,
        userRegister,
        setIsLogin,
        forgetPassword,
        phoneCheck,
        code,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
