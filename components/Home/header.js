"use client";
import base from "lib/base";

const { useCartContext } = require("context/cartContext");
const { useMenuContext } = require("context/menuContext");
const { useWebInfoContext } = require("context/webinfoContext");
const { useEffect } = require("react");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const HomeHeader = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus, getMenu } = useMenuContext();
  const { cart } = useCartContext();

  useEffect(() => {
    getInfo();
    getMenu();
  }, []);

  return (
    <>
      <header className="mainHeader ">
        <div className="container">
          <div className="header">
            <div className="headerLeft">
              <div className="headerLogo">
                {info.logo && (
                  <Link href="/">
                    <img
                      src={`${base.cdnUrl}/${info.whiteLogo}`}
                      className="whiteLogo"
                    />
                  </Link>
                )}
              </div>
              <div className="headerMid">
                <ul className="headerMenu">{menus}</ul>
              </div>
            </div>
            <div className="headerButtons">
              <Link href="/login">
                <button className="user-btn">Хэрэглэгч</button>
              </Link>
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
