import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 60;
export const getFaqs = async (query) => {
  let faqs = [];
  let error = null;
  let pagination = {};

  const res = await fetcher(`${base.apiUrl}/faqs?${query}`, {
    cache: "force-cache",
    next: { revalidate: 120 },
  });

  if (res) {
    faqs = res.data;
    pagination = res.pagination;
  }

  return { faqs, pagination, error };
};

export const getFaq = async (id) => {
  let error = null;
  let faq = {};

  const res = await fetcher(`${base.apiUrl}/faqs/${id}`, {
    cache: "force-cache",
    next: { revalidate: 360 },
  });

  if (res) {
    faq = res.data;
  }

  return { faq, error };
};

export const contactAdd = async (values) => {
  let error = "";
  let success = null;
  let loading = false;

  await axios
    .post("faqs", values)
    .then(() => {
      loading = true;
      success = "Санал хүсэлтийг хүлээж авлаа";
    })
    .catch((err) => {
      error = err;
    });

  return { error, success, loading };
};
