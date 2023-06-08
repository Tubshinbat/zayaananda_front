import base from "./base";
import fetcher from "fetcher";

export const revalidate = 60;

export const getCourses = async (query) => {
  let courses = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/initcourses?${query}`, {
    next: { revalidate: 10 },
  });
  if (result) {
    courses = result.data;
    pagination = result.pagination;
  }

  return { courses, pagination, error };
};
