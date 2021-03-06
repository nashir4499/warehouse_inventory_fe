import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function UbahBarangKeluar(props) {
  const [data, setData] = useState({
    stok_bk: "",
    deskripsi: "",
    barang_id: [],
  });

  useEffect(() => {
    checkItem();
  }, []);
  const [barangs, setBarangs] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/bkeluar/${props.match.params.id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setData({
          stok_bk: res.data.stok_bk,
          deskripsi: res.data.deskripsi,
          barang_id: res.data.barang_id,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/barang`, { headers: authHeader() })
      .then((res) => {
        setBarangs(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  const handleChange = (nama, value) => {
    setData({
      ...data,
      [nama]: value,
    });
  };

  const savePerubahan = (e) => {
    e.preventDefault();
    Axios.post(
      `${url}/bkeluar/${props.match.params.id}`,
      {
        stok_bk: data.stok_bk,
        deskripsi: data.deskripsi,
        barang_id: data.barang_id,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        props.history.push("/barangkeluar");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid mt-3 api">
      <Helmet>
        <title>Ubah Barang Keluar</title>
      </Helmet>
      <h4>Ubah Barang Keluar</h4>
      <Link to="/barangkeluar" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={savePerubahan}>
        <div className="form-group">
          <label>stok Barang Keluar</label>
          <input
            type="text"
            className="form-control"
            value={data.stok_bk}
            onChange={(e) => handleChange("stok_bk", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Deskripsi</label>
          <input
            type="text"
            className="form-control"
            value={data.deskripsi}
            onChange={(e) => handleChange("deskripsi", e.target.value)}
          />
        </div>
        <fieldset id="group1">
          <div className="form-group">
            <label>Pilih Barang</label>
            <select
              className="custom-select"
              id="barangs"
              name="barangs"
              value={data.barang_id}
              onChange={(e) => handleChange("barang_id", e.target.value)}
            >
              <option defaultValue>Choose...</option>
              {barangs &&
                barangs.map((barang) => {
                  // const cek = barang.stok - barang.pinjam.length > 0;
                  return (
                    <option key={barang.id} value={barang.id}>
                      {barang.produk}
                    </option>
                  );
                })}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default UbahBarangKeluar;
