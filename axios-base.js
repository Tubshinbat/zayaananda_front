import axios from "axios";

const instance = axios.create({
  baseURL: "https://zaya-ananda.com/api/",
});

instance.defaults.withCredentials = true;

export default instance;
