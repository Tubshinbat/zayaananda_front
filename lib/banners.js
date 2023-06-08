import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getBanners = async () => {
  let banners = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/banners`, {
    next: { revalidate: 30 },
  });

  if (result) banners = result.data;

  return { banners, error };
};
