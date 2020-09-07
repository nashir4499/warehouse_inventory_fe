import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { url } from "../../services/config";

function TambahRoleUser(props) {
  const [data, setData] = useState({
    id: "",
    nama: "",
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
      `${url}/role`,
      {
        id: data.id,
        nama: data.nama,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        console.log(res);
        props.history.push("/role");
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
      <h4>Tambah role</h4>
      <Link to="/role" className="btn btn-warning mb-3">
        Kembali
      </Link>
      <br />

      <form onSubmit={savePinjam}>
        <div className="form-group">
          <label>Nama Role</label>
          <input
            type="text"
            className="form-control"
            value={data.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default TambahRoleUser;
