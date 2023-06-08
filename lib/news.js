import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const getNews = async (query) => {
  let news = [];
  let error = null;
  let pagination = {};

  const res = await fetcher(`${base.apiUrl}/news?${query}`, {
    next: { revalidate: 10 },
  });

  if (res) {
    news = res.data;
    pagination = res.pagination;
  }
  return { news, pagination, error };
};

export const getContent = async (id) => {
  let news = {};
  let error = null;

  const res = await fetcher(`${base.apiUrl}/news/${id}`, {
    cache: "force-cache",
  });
  if (res) news = res.data;

  return { news, error };
};

export const getCategories = async (query) => {
  let categories = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/news-categories?${query}`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });
  if (result) categories = result.data;

  return { categories, error };
};

export const getSlugCategory = async (slug) => {
  let category = {};
  let error = null;

  const result = await fetcher(`${base.apiUrl}/news-categories/slug/${slug}`, {
    next: { revalidate: 80 },
  });
  if (result) category = result.data;

  return { category, error };
};
