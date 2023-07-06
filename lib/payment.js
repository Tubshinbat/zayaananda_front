import base from "./base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getBanks = async () => {
  let banks = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/paytypes`, {
    next: { revalidate: 10 },
  });
  if (result) {
    banks = result.data;
  }

  return { banks, error };
};
