const { default: Axios } = require("axios");
const { default: authHeader } = require("./auth-header");

const API_URL = "http://192.168.100.173:3333/api/api/";


const checkToken = () => {
    return Axios.get(API_URL + "check", { headers: authHeader() })
    // .then((res) => {
    //     return res.data;
    // }).catch(err => {
    //     console.log(err)
    //     // setLoading(false)
    // })
}

export default checkToken