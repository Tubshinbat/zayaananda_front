"use client";

import base from "lib/base";

const { useCartContext } = require("context/cartContext");
const { useMenuContext } = require("context/menuContext");
const { useWebInfoContext } = require("context/webinfoContext");
import { useAuthContext } from "context/authContext";
const { useEffect } = require("react");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCookies } from "react-cookie";

const HomeHeader = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus, getMenu } = useMenuContext();
  const { userData, checkToken } = useAuthContext();
  const { cart } = useCartContext();
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
    getInfo();
    getMenu();
  }, []);

  return (
    <>
      <header className=" headerBlock">
        <div className="container">
          <div className="header">
            <div className="headerLeft">
              <div className="headerLogo">
                {info.logo && (
                  <a href="/">
                    <img
                      src={`${base.cdnUrl}/${info.whiteLogo}`}
                      className="whiteLogo"
                    />
                  </a>
                )}
              </div>
              <div className="headerMid">
                <ul className="headerMenu">{menus}</ul>
              </div>
            </div>
            <div className="headerButtons">
              {!userData && (
                <Link href="/login">
                  <button className="user-btn">Хэрэглэгч</button>
                </Link>
              )}
              {userData && (
                <Link href="/userprofile">
                  <button className="user-btn">{userData.firstName}</button>
                </Link>
              )}
              <Link href="/cart">
                <button className="cart-btn">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span>{cart.length}</span>
                </button>
              </Link>
              {/* <MobileHeader /> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
