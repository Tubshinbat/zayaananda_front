"use client";
import { getMenus } from "lib/menus";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";

const MenuContext = createContext({});

const renderMenu = (categories, child = false, parentSlug = "") => {
  let myCategories = [];
  categories &&
    categories.map((el) => {
      myCategories.push(
        <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
          {el.isDirect === true && (
            <a href={el.direct} className="header-link">
              {el.name}
            </a>
          )}
          {el.isModel === true && (
            <Link href={`/${el.model}`} className="header-link" scroll={false}>
              {el.name}
            </Link>
          )}

          {el.isDirect === false && el.isModel === false && (
            <Link
              href={`/page/${el.slug}`}
              className="header-link"
              scroll={false}
            >
              {el.name}
            </Link>
          )}

          {el.children.length > 0 && !child ? (
            <ul className={`dropdownMenu`}>
              {renderMenu(el.children, true, el.slug)}
            </ul>
          ) : null}
        </li>
      );
    });

  return myCategories;
};

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);

  const getMenu = async () => {
    const { menus: resultMenus } = await getMenus();

    if (resultMenus) {
      setMenus(() => renderMenu(resultMenus));
    }
  };

  return (
    <MenuContext.Provider value={{ menus, getMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);
