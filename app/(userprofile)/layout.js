"use client";
import HomeHeader from "components/Generals/Header";
import Side from "components/Users/Side";
import { useAuthContext } from "context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { checkToken, isLogin } = useAuthContext();
  const [cookies] = useCookies(["zayatoken"]);

  useEffect(() => {
    if (
      cookies.zayatoken !== undefined &&
      cookies.zayatoken !== null &&
      cookies.zayatoken !== "undefined"
    ) {
      checkToken(cookies.zayatoken);
    }
  }, [cookies]);

  useEffect(() => {
    if (isLogin === false) {
      redirect("/login");
    }
  }, [isLogin]);

  return (
    <>
      <HomeHeader />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Side />
            </div>
            <div className="col-md-9">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
