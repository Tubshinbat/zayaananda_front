import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const getOnlineCourses = async (query) => {
  let courses = [];
  let error = null;
  let pagination = {};

  const res = await fetcher(`${base.apiUrl}/initcourses?${query}`, {
    next: { revalidate: 10 },
  });

  if (res) {
    courses = res.data;
    pagination = res.pagination;
  }
  return { courses, pagination, error };
};
