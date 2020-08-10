const { default: Axios } = require("axios");

const API_URL = "http://127.0.0.1:3333/api/api/";

const login = (email, password) => {
    return Axios
        .post(API_URL + "login", {
            email,
            password,
        }).then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data))
            }

            return res.data;
        })
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export default {
    login,
    logout,
    getCurrentUser
}