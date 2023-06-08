import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getSocials = async () => {
  let socialLinks = [];
  let error = null;
  const result = await fetcher(`${base.apiUrl}/slinks`);
  if (result) socialLinks = result.data;
  return { socialLinks, error };
};
