"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./notificationContext";
import axios from "axios-base";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["zayatoken"]);
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const [user, setUser] = useState(null);
  const [isCourse, setIsCourse] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [code, setCode] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    if (cookies.zayatoken) {
      checkToken(cookies.zayatoken);
    } else {
      logOut();
    }
  }, [cookies.zayatoken]);

  const checkToken = (token) => {
    axios
      .post("users/checktoken", {
        withCredentials: true,
        headers: { Cookie: `zayatoken=${token}` },
      })
      .then((result) => {
        if (!user) {
          setUser(result.data.user);
        }
      })
      .catch((error) => {
        logOut();
      });
  };

  const logOut = () => {
    axios.get("users/logout").catch((error) => {});
    setCode(false);
    setUser(null);
    setIsCourse(false);
    setIsPassword(false);
    setIsRedirect(false);
    removeCookie("zayatoken");
  };

  const loginUser = (data) => {
    setContentLoad(true);
    axios
      .post("users/login", data)
      .then((result) => {
        setUser(result.data.user);
        setAlert("Амжилттай нэвтэрлээ");
        setContentLoad(false);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
      });
  };

  const userRegister = (formData) => {
    setContentLoad(true);
    axios
      .post("users/register", formData)
      .then((result) => {
        setAlert("Бүртгэл амжилттай хийгдлээ");
        setContentLoad(false);
        setIsRedirect(true);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
        setIsRedirect(false);
      });
  };

  const getUser = () => {
    if (!user && cookies.zayatoken) {
      setContentLoad(true);
      axios
        .get(`users/userdata`, {
          withCredentials: true,
          headers: { Cookie: `zayatoken=${cookies.zayatoken}` },
        })
        .then((res) => {
          setUser(res.data.data);
          setContentLoad(false);
        })
        .catch((error) => {
          setError(error);
          setContentLoad(false);
        });
    }
  };

  const phoneCheck = async (phoneNumber) => {
    setCode(false);
    setContentLoad(true);
    axios
      .post("users/forgot-password", phoneNumber)
      .then((result) => {
        setAlert("Бүртгэлтэй утасны дугаарлуу баталгаажуулах код илгээлээ ");
        setCode(true);
      })
      .catch((error) => {
        setError(error);
        setCode(false);
      });
  };

  const forgetPassword = (body) => {
    if (code === true) {
      setContentLoad(true);
      axios
        .post("users/reset-password", body)
        .then((result) => {
          setAlert("Нууц үг амжилттай солигдлоо");
          setContentLoad(false);
          setIsPassword(true);
        })
        .catch((error) => {
          setError(error);
          setContentLoad(false);
          setIsPassword(false);
        });
    }
  };

  const checkCourse = (courseId) => {
    if (user) {
      axios
        .get(`users/coursecheck?userId=${user._id}&courseId=${courseId}`)
        .then((result) => {
          setIsCourse(true);
        })
        .catch((error) => {
          setError(error);
          setIsCourse(false);
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        loginUser,
        userRegister,
        getUser,
        code,
        setCode,
        user,
        phoneCheck,
        checkCourse,
        forgetPassword,
        isPassword,
        setIsPassword,
        setIsCourse,
        isCourse,
        isRedirect,
        setIsRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
