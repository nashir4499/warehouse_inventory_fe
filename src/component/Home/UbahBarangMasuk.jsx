import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function UbahBarangMasuk(props) {
  const [data, setData] = useState({
    stok_bm: "",
    deskripsi: "",
    barang_id: [],
  });

  useEffect(() => {
    checkItem();
  }, []);
  const [barangs, setBarangs] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/bmasuk/${props.match.params.id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setData({
          stok_bm: res.data.stok_bm,
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
    if (data.barang_id !== "0") {
      Axios.post(
        `${url}/bmasuk/${props.match.params.id}`,
        {
          stok_bm: data.stok_bm,
          deskripsi: data.deskripsi,
          barang_id: data.barang_id,
        },
        { headers: authHeader() }
      )
        .then((res) => {
          props.history.push("/barangmasuk");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
    } else {
      alert("Stok Kosong");
    }
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid mt-3 api">
      <Helmet>
        <title>Ubah Barang Masuk</title>
      </Helmet>
      <h4>Ubah Barang Masuk</h4>
      <Link to="/barangmasuk" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={savePerubahan}>
        <div className="form-group">
          <label>stok Barang Masuk</label>
          <input
            type="text"
            className="form-control"
            value={data.stok_bm}
            onChange={(e) => handleChange("stok_bm", e.target.value)}
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

export default UbahBarangMasuk;
