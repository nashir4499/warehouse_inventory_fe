import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";
import { useEffect } from "react";

function TambahRak(props) {
  const [data, setData] = useState({
    id: "",
    nama: "",
  });

  const [volumeRak, setVolumeRak] = useState();

  const [ukuran, setUkuran] = useState({
    panjang: 0,
    lebar: 0,
    tinggi: 0,
  });

  useEffect(() => {
    if (ukuran.panjang !== 0 && ukuran.lebar !== 0 && ukuran.tinggi !== 0) {
      const volume = ukuran.panjang * ukuran.lebar * ukuran.tinggi;
      return setVolumeRak(volume);
    }
  }, [setVolumeRak, ukuran.panjang, ukuran.lebar, ukuran.tinggi]);

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
  // const handleChangeUkuran = (nama, value) => {
  //   setUkuran({
  //     ...ukuran,
  //     [nama]: value,
  //   });
  // };

  const savePinjam = (e) => {
    e.preventDefault();
    Axios.post(
      `${url}/rak`,
      {
        id: data.id,
        nama: data.nama,
        volume_rak: volumeRak,
        panjang: ukuran.panjang,
        lebar: ukuran.lebar,
        tinggi: ukuran.tinggi,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        console.log(res);
        props.history.push("/rak");
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
        <title>Tambah Rak</title>
      </Helmet>
      <h4>Tambah Rak</h4>
      <Link to="/rak" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={savePinjam}>
        <div className="form-group">
          <label htmlFor="rilis">ID</label>
          <input
            type="text"
            className="form-control"
            value={data.id}
            onChange={(e) => handleChange("id", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nama Rak</label>
          <input
            type="text"
            className="form-control"
            value={data.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
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
              // value={data.volume_rak}
              value={volumeRak || 0}
              // onChange={(e) => handleChange("volume_rak", volumeRak)}
              disabled
            />
            <div className="input-group-append">
              <span className="input-group-text cm">cm3</span>
            </div>
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default TambahRak;
