import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getAdsHome = async () => {
  let homeAds = [];
  let error = null;

  const result = await fetcher(
    `${base.apiUrl}/adsbanners?${`limit=5&type=home`}`,
    { next: { revalidate: 30 } }
  );
  if (result) homeAds = result.data;

  return { homeAds, error };
};

export const getAdsSide = async () => {
  let ads = [];
  let error = null;

  const res = await fetcher(`${base.apiUrl}/adsbanners?limit=1&type=side`, {
    next: { revalidate: 30 },
  });
  if (res) ads = res.data;
  return { ads, error };
};

export const getAdsies = async (query) => {
  let adsies = [];
  let error = null;
  let pagination = {};

  const res = await fetcher(`${base.apiUrl}/adsies?${query}`, {
    next: { revalidate: 30 },
  });

  if (res) {
    adsies = res.data;
    pagination = res.pagination;
  }

  return { adsies, pagination, error };
};

export const getAds = async (id) => {
  let error = null;
  let ads = {};

  const res = await fetcher(`${base.apiUrl}/adsies/${id}`, {
    next: { revalidate: 30 },
  });

  if (res) {
    ads = res.data;
  }

  return { ads, error };
};
