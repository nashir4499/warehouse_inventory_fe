const { default: Axios } = require("axios");
const { default: authHeader } = require("./auth-header");

const API_URL = "http://127.0.0.1:3333/api/api/";


const checkToken = () => {
    return Axios.get(API_URL + "check", { headers: authHeader() });
}

export default checkToken