import { url } from "./config";

const { default: Axios } = require("axios");

const API_URL = `${url}/bmasuk`;

const barang = () => {
  return Axios.get(API_URL);
};
const storeBarang = (
  series,
  produk,
  suplier_id,
  kategori_id,
  stok,
  deskripsi
) => {
  return Axios.post(API_URL);
};
const updateBarang = (
  series,
  produk,
  suplier_id,
  kategori_id,
  stok,
  deskripsi
) => {
  return Axios.post(API_URL);
};

export default {
  barang,
  storeBarang,
  updateBarang,
};
