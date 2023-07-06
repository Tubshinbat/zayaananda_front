import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";
import { useCookies } from "react-cookie";

export const getOrders = async (cookie) => {
  let orders = [];
  let error = null;
  let pagination = {};
  const [cookies] = useCookies(["zayatoken"]);

  const res = await fetcher(`${base.apiUrl}/orders/user?`, {
    headers: {
      Cookie: `zayatoken=${cookie}`,
    },
  });

  if (res) {
    orders = res.data;
    pagination = res.pagination;
  }
  return { orders, pagination, error };
};
