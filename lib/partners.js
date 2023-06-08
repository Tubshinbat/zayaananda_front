import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 5;

export const getPartners = async (query) => {
  let partners = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/partners?${query}`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });
  if (result) {
    partners = result.data;
    pagination = result.pagination;
  }
  return { partners, pagination, error };
};

export const getPartner = async (id) => {
  let partner = {};
  let error = null;

  const result = await fetcher(`${base.apiUrl}/partners/${id}`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });
  if (result) {
    partner = result.data;
  }

  return { partner, error };
};
