import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getEmployees = async (query) => {
  let employees = [];
  let error = null;

  const res = await fetcher(`${base.apiUrl}/employees?${query}`, {
    next: { revalidate: 10 },
  });

  if (res) employees = res.data;

  return { employees, error };
};
