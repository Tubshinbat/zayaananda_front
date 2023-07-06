"use client";
import HomeHeader from "components/Generals/Header";
import Side from "components/Users/Side";
import { useAuthContext } from "context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

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
