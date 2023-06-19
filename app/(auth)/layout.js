"use client";
import HomeHeader from "components/Generals/Header";
import { useAuthContext } from "context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { checkToken, isLogin, clear } = useAuthContext();
  const [cookies] = useCookies(["zayatoken"]);

  useEffect(() => {
    console.log(cookies.zayatoken);
    if (
      cookies.zayatoken !== undefined &&
      cookies.zayatoken !== null &&
      cookies.zayatoken !== "undefined"
    ) {
      checkToken(cookies.zayatoken);
    }
  }, [cookies]);

  useEffect(() => {
    if (isLogin === true) {
      redirect("/userprofile");
    }
  }, [isLogin]);

  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}
