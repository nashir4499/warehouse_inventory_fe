import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function TambahSuplier(props) {
  const [data, setData] = useState({
    id: "",
    alamat: "",
    no_tlp: "",
    deskripsi: "",
  });

  const handleChange = (nama, value) => {
    setData({
      ...data,
      [nama]: value,
    });
  };

  const savePinjam = (e) => {
    e.preventDefault();
    Axios.post(
      `${url}/suplier`,
      {
        id: data.id,
        alamat: data.alamat,
        no_tlp: data.no_tlp,
        deskripsi: data.deskripsi,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        console.log(res);
        props.history.push("/suplier");
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
        <title>Tambah Suplier</title>
      </Helmet>
      <h4>Tambah Suplier</h4>
      <Link to="/suplier" className="btn btn-warning mb-3">
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
          />
        </div>
        <div className="form-group">
          <label>Alamat Suplier</label>
          <input
            type="text"
            className="form-control"
            value={data.alamat}
            onChange={(e) => handleChange("alamat", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>No Telpon Suplier</label>
          <input
            type="text"
            className="form-control"
            value={data.no_tlp}
            onChange={(e) => handleChange("no_tlp", e.target.value)}
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
        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default TambahSuplier;
