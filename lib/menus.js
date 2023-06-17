import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getMenus = async (query = null) => {
  let menus = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/menus`, {
    next: { revalidate: 30 },
  });

  if (result) {
    menus = result.data;
  }

  return { menus, error };
};

export const getMenu = async (query) => {
  let menu = null;
  let error = null;

  const result = await fetcher(`${base.apiUrl}/menus/1?${query}`, {
    next: { revalidate: 30 },
  });

  if (result) {
    menu = result.data;
  }
  return { menu, error };
};

export const getFooterMenus = async () => {
  let menus = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/footermenus`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });
  if (result) menus = result.data;

  return { menus, error };
};
