import { url } from "./config";

const { default: Axios } = require("axios");
const { default: authHeader } = require("./auth-header");

const API_URL = `${url}/api/api/`;

const checkToken = () => {
  return Axios.get(API_URL + "check", { headers: authHeader() });
};

export default checkToken;
