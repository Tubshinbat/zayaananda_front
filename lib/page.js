import base from "./base";
import fetcher from "fetcher";

export const getPageFull = async (query) => {
  let pages = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/pages/excel?${query}`, {
    next: { revalidate: 10 },
  });

  if (result) {
    pages = result.data;
  }

  return { pages, error };
};

export const getPages = async (query) => {
  let pages = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/pages?${query}`, {
    next: { revalidate: 10 },
  });

  if (result) {
    pages = result.data;
    pagination = result.pagination;
  }

  return { pages, pagination, error };
};

export const getIdPage = async (id) => {
  let page = {};
  let news = [];
  let childPages = [];
  let menus = [];
  let pages = [];
  const result = await fetcher(`${base.apiUrl}/pages/${id}`);
  if (result) {
    page = result.data;
    news = result.news;
    childPages = result.childPages;
    menus = result.menus;
    pages = result.pages;
  }
  const data = { page, news, childPages, menus, pages };
  return data;
};

export const getPage = async (slug) => {
  let page = {};
  let news = [];
  let menu = {};
  let pages = [];
  let menus = [];
  let error = null;
  let linkPages = [];
  let parentSameMenus = [];

  const result = await fetcher(`${base.apiUrl}/pages/slug/${slug}`);

  if (result) {
    menu = result.menu;
    page = result.page;
    pages = result.pages;
    linkPages = result.linkPages;
    parentSameMenus = result.parentSameMenus;
    news = result.news;
    menus = result.menus;
  }
  const data = { page, news, menu, pages, menus, parentSameMenus, linkPages };
  return data;
};
