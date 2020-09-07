import { url } from "./config";

const { default: Axios } = require("axios");

const API_URL = `${url}/api/api/`;

const login = (email, password) => {
  return Axios.post(API_URL + "login", {
    email,
    password,
  }).then((res) => {
    if (res.data.token) {
      // localStorage.setItem("user", JSON.stringify(res.data))
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  });
  // .catch(err => { //asalnya juga gak ada
  //     alert("email atau password")
  //     console.log(err)
  // })
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
