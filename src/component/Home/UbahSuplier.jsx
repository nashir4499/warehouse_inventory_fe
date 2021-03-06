import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function UbahSuplier(props) {
  const [data, setData] = useState({
    id: "",
    alamat: "",
    no_tlp: "",
    deskripsi: "",
  });

  useEffect(() => {
    checkItem();
  }, []);

  const checkItem = () => {
    Axios.get(`${url}/suplier/${props.match.params.id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setData({
          id: res.data.id,
          alamat: res.data.alamat,
          no_tlp: res.data.no_tlp,
          deskripsi: res.data.deskripsi,
        });
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
      `${url}/suplier/${props.match.params.id}`,
      {
        id: data.id,
        alamat: data.alamat,
        no_tlp: data.no_tlp,
        deskripsi: data.deskripsi,
      },
      { headers: authHeader() }
    )
      .then((res) => {
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
        <title>Ubah Suplier</title>
      </Helmet>
      <h4>Ubah Suplier</h4>
      <Link to="/suplier" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={savePerubahan}>
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
          <label>Alamat</label>
          <input
            type="text"
            className="form-control"
            value={data.alamat}
            onChange={(e) => handleChange("alamat", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>No Telpon</label>
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

export default UbahSuplier;
