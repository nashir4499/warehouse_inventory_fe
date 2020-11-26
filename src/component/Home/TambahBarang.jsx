import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function TambahBarang(props) {
  const [data, setData] = useState({
    id: "",
    produk: "",
    stok: "",
    deskripsi: "",
    suplier_id: "",
    kategori_id: "",
  });
  const [volumeBarang, setVolumeBarang] = useState();

  const [ukuran, setUkuran] = useState({
    panjang: 0,
    lebar: 0,
    tinggi: 0,
  });
  useEffect(() => {
    checkItem();
  }, []);

  useEffect(() => {
    const volume = ukuran.panjang * ukuran.lebar * ukuran.tinggi;
    return setVolumeBarang(volume);
  }, [setVolumeBarang, ukuran.panjang, ukuran.lebar, ukuran.tinggi]);

  const [kategoris, setKategoris] = useState([]);
  const [supliers, setSupliers] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/kategori`, { headers: authHeader() })
      .then((res) => {
        setKategoris(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/suplier`, { headers: authHeader() })
      .then((res) => {
        setSupliers(res.data);
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
    setUkuran({
      ...ukuran,
      [nama]: value,
    });
  };

  const simpanData = (e) => {
    e.preventDefault();

    Axios.post(
      `${url}/barang`,
      {
        id: data.id,
        produk: data.produk,
        stok: data.stok,
        volume_barang: volumeBarang,
        panjang: ukuran.panjang,
        lebar: ukuran.lebar,
        tinggi: ukuran.tinggi,
        deskripsi: data.deskripsi,
        suplier_id: data.suplier_id,
        kategori_id: data.kategori_id,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        console.log(res);
        props.history.push("/barang");
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
        <title>Tambah Barang</title>
      </Helmet>
      <h4>Tambah Barang </h4>
      <Link to="/barang" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={simpanData}>
        <div className="form-group">
          <label htmlFor="rilis">Kode Barang</label>
          <input
            type="text"
            className="form-control"
            value={data.id}
            onChange={(e) => handleChange("id", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nama Produk</label>
          <input
            type="text"
            className="form-control"
            value={data.produk}
            onChange={(e) => handleChange("produk", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Stok Barang</label>
          <input
            type="number"
            className="form-control"
            value={data.stok}
            onChange={(e) => handleChange("stok", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Volume Rak</label>
          <div className="row mb-2">
            <div className="col-sm">
              <h6>Panjang</h6>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={ukuran.panjang}
                  onChange={(e) => handleChange("panjang", e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text cm">cm</span>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <h6>Lebar</h6>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={ukuran.lebar}
                  onChange={(e) => handleChange("lebar", e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text cm">cm</span>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <h6>Tinggi</h6>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={ukuran.tinggi}
                  onChange={(e) => handleChange("tinggi", e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text cm">cm</span>
                </div>
              </div>
            </div>
          </div>
          <h6>Volume</h6>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              // value={data.volume_barang}
              value={volumeBarang || 0}
              // onChange={(e) => handleChange("volume_barang", volumeBarang)}
              disabled
            />
            <div className="input-group-append">
              <span className="input-group-text cm">cm3</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <input
            type="text"
            className="form-control"
            value={data.deskripsi}
            onChange={(e) => handleChange("deskripsi", e.target.value)}
            required
          />
        </div>
        <fieldset id="group1">
          <div className="form-group">
            <label>Pilih Kategori</label>
            <select
              className="custom-select"
              id="kategoris"
              name="kategoris"
              onChange={(e) => handleChange("kategori_id", e.target.value)}
              required
            >
              <option value="">Choose...</option>
              {kategoris &&
                kategoris.map((kategori) => {
                  // const cek = barang.stok - barang.pinjam.length > 0;
                  return (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.nama}
                    </option>
                  );
                })}
            </select>
          </div>
        </fieldset>
        <fieldset id="group1">
          <div className="form-group">
            <label>Pilih Suplier</label>
            <select
              className="custom-select"
              id="supliers"
              name="supliers"
              onChange={(e) => handleChange("suplier_id", e.target.value)}
              required
            >
              <option value="">Choose...</option>
              {supliers &&
                supliers.map((suplier) => {
                  // const cek = barang.stok - barang.pinjam.length > 0;
                  return (
                    <option key={suplier.id} value={suplier.id}>
                      {suplier.id}
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

export default TambahBarang;
