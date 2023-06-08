import base from "./base";
import axios from "../axios-base";
import fetcher from "fetcher";

export const revalidate = 5;

export const getCosts = async (query) => {
  let costs = [];
  let error = null;
  let pagination = {};

  const result = await fetcher(`${base.apiUrl}/costs?${query}`);

  if (result) {
    costs = result.data;
    pagination = result.pagination;
  }

  return { costs, pagination, error };
};

export const getFilterCosts = async (query) => {
  let chartData = [];
  let pagination = {};
  let costs = [];

  const result = await fetcher(`${base.apiUrl}/costs/filter?${query}`);

  if (result) {
    chartData = result.data;
    pagination = result.pagination;
    costs = result.showData;
  }

  return { chartData, pagination, costs };
};

export const getCostTypes = async (query) => {
  let costTypes = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/costtypes?${query}`);
  if (result) costTypes = result.data;
  return { costTypes };
};

export const getInitCosts = async () => {
  let costs = [];
  let maxCosts = [];
  let error = null;

  const result = await fetcher(`${base.apiUrl}/costs/init`);
  if (result) {
    costs = result.data;
    maxCosts = result.maxCosts;
  }

  return { initCosts: costs, maxCosts };
};

export const getTableDatas = async (query) => {
  let tableDatas = [];
  let tableDates = [];
  const result = await fetcher(`${base.apiUrl}/costs/table?${query}`);

  if (result) {
    tableDatas = result.datas;
    tableDates = result.dates;
  }

  return { tableDatas, tableDates };
};
