import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getProducts = async (query) => {
  let products = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/products?${query}`, {
    next: { revalidate: 10 },
  });
  if (result) {
    products = result.data;
    pagination = result.pagination;
  }

  return { products, pagination, error };
};
