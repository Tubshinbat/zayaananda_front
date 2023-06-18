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

const HomeHeader = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus, getMenu } = useMenuContext();
  const { userData } = useAuthContext();
  const { cart } = useCartContext();

  console.log(userData);

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
              <button className="cart-btn">
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{cart.length}</span>
              </button>
              {/* <MobileHeader /> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
