import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getServices = async (query) => {
  let services = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/services?${query}`, {
    next: { revalidate: 10 },
  });
  if (result) {
    services = result.data;
    pagination = result.pagination;
  }

  return { services, pagination, error };
};

export const getService = async (id) => {
  let service = {};
  let error = null;

  const result = await fetcher(`${base.apiUrl}/services/${id}`, {
    next: { revalidate: 10 },
  });
  if (result) {
    service = result.data;
  }

  return { service, error };
};
