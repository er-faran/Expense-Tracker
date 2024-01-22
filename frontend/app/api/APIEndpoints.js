const apiJSONEndpoints = require("./apiEndpoint.json");
const BASE_URL = process?.env?.BACKEND_API_BASE_URL;
const getAllExpenseDataHandler = () => {
  return BASE_URL + apiJSONEndpoints.GET_ALL_EXPENSE;
};
const createExpenseHandler = () => {
  return BASE_URL + apiJSONEndpoints.CREATE_EXPENSE;
};

export const APIEndpoints = {
  getAllExpenseDataHandler,
  createExpenseHandler,
};
