"use client";
import base from "lib/base";
import { useWebInfoContext } from "context/webinfoContext";
import { useEffect } from "react";
import { useMenuContext } from "context/menuContext";
import { useCartContext } from "context/cartContext";
import MobileHeader from "components/MobileHeader";

const Header = () => {
  const { info, getInfo } = useWebInfoContext();
  const { menus, getMenu } = useMenuContext();
  const { cart } = useCartContext();
  useEffect(() => {
    getInfo();
    getMenu();
  }, []);

  return (
    <>
      <header className={`mainHeader headerBlock `}>
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
              <button className="user-btn">Хэрэглэгч</button>
              <button className="cart-btn">
                <i className="fa-solid fa-cart-shopping"></i>
                <span>{cart.length}</span>
              </button>
              <MobileHeader />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
