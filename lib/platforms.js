import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getPlatforms = async (query) => {
  let platforms = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/platforms?${query}`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  });

  if (result) {
    platforms = result.data;
    pagination = result.pagination;
  }

  return { platforms, pagination, error };
};

export const getPlatform = async (id) => {
  let platform = {};
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/platforms/${id}`, {
    next: { revalidate: 10 },
  });

  if (result) {
    platform = result.data;
    pagination = result.pagination;
  }

  return { platform, pagination, error };
};
