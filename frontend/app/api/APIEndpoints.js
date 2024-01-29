const apiJSONEndpoints = require("./apiEndpoint.json");
const BASE_URL = process?.env?.BACKEND_API_BASE_URL;
const getAllExpenseDataHandler = () => {
  return BASE_URL + apiJSONEndpoints.GET_ALL_EXPENSE;
};
const createExpenseHandler = () => {
  return BASE_URL + apiJSONEndpoints.CREATE_EXPENSE;
};
const updateExpenseHandler = () => {
  return BASE_URL + apiJSONEndpoints.UPDATE_EXPENSE;
};
const deleteExpenseHandler = (id) => {
  return BASE_URL + apiJSONEndpoints.DELETE_EXPENSE + `/${id}`;
};

const getExpenseByCategoryHandler = (id) => {
  return BASE_URL + apiJSONEndpoints.GET_EXPENSE_BY_CATEGORY;
};
const signinHandler = (id) => {
  return BASE_URL + apiJSONEndpoints.SIGN_IN;
};
const signupHandler = (id) => {
  return BASE_URL + apiJSONEndpoints.SIGN_UP;
};

export const APIEndpoints = {
  getAllExpenseDataHandler,
  createExpenseHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
  getExpenseByCategoryHandler,
  signinHandler,
  signupHandler,
};
