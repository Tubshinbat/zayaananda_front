'use client';
import HomeHeader from "components/Generals/Header";
import { useAuthContext } from "context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


export default function RootLayout({ children }) {
  const { checkToken,isLogin } =
    useAuthContext();
  const [cookies] = useCookies(["zayatoken"]);

  useEffect(() => {
    if(cookies.zayatoken){
      checkToken(cookies.zayatoken)
    }
  },[cookies])

  useEffect(() => {
    if(isLogin === false){
      redirect('/login');
    }
  },[isLogin])

  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}
