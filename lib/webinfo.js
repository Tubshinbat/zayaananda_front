import fetcher from "fetcher";
import base from "lib/base";
import axios from "../axios-base";

export const revalidate = 60;

export const getWebInfo = async () => {
  let webInfo = {};
  let error = null;

  const result = await fetcher(`${base.apiUrl}/webinfo`);

  if (result) webInfo = result.data;

  return { webInfo, error };
};
