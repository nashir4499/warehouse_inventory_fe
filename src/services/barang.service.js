const { default: Axios } = require("axios");

const API_URL = "http://127.0.0.1:3333/bmasuk";

const barang = () => {
    return Axios.get(API_URL)

}
const storeBarang = (series, produk, suplier_id, kategori_id, stock, deskripsi) => {
    return Axios.post(API_URL)
}
const updateBarang = (series, produk, suplier_id, kategori_id, stock, deskripsi) => {
    return Axios.post(API_URL)
}


export default {
    barang,
    storeBarang,
    updateBarang
}