import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 5;

export const getGallerys = async (query) => {
  let gallerys = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/gallerys?${query}`, {
    cache: "force-cache",
  });
  if (result) gallerys = result.data;

  return { gallerys, error };
};
