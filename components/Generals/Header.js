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
import MobileMenu from "components/Generals/MobileMenu";

const HomeHeader = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus, getMenu } = useMenuContext();
  const { user } = useAuthContext();
  const { cart } = useCartContext();
  const [cookies] = useCookies(["zayatoken"]);

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
              {!user && (
                <Link href="/login">
                  <button className="user-btn">Хэрэглэгч</button>
                </Link>
              )}
              {user && (
                <Link href="/userprofile">
                  <button className="user-btn">{user.firstName}</button>
                </Link>
              )}
              <Link href="/cart">
                <button className="cart-btn">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span>{cart.length}</span>
                </button>
              </Link>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
