import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 5;

export const loginUser = (data) => {
  let user = null;
  let error = null;

  axios
    .post("/users/login", data)
    .then((result) => {
      user = result.data;
    })
    .catch((error) => (error = error));

  return { user, error };
};
