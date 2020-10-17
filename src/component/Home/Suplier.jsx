import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function Suplier() {
  useEffect(() => {
    checkItem();
  }, []);

  const [supliers, setSupliers] = useState([]);

  const checkItem = () => {
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

  const handleDelete = (id) => {
    if (window.confirm("Hapus Item?")) {
      Axios.delete(`${url}/suplier/${id}`, {
        headers: authHeader(),
      }) //pake bactrik kalo mau ngirim parameter
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
    }
  };

  //search
  const [search, setInput] = useState("");

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  var nomor = 1;
  return (
    <div className="container mt-4">
      <Helmet>
        <title>Suplier</title>
      </Helmet>
      <div className="row">
        <div className="col-md-5 card-lain">
          <h2>Daftar Suplier</h2>
          <Link className="btn btn-primary" to="/suplier/tambah">
            Tambah Suplier Baru
          </Link>
        </div>
        <div className="col-md-5 offset-md-2 rowSearchLain">
          <div className="rowSearchIsiLain">
            <input
              className="form-control search"
              type="text"
              value={search}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cari barang"
            />
          </div>
        </div>
      </div>
      <div className="row card-lain table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="thawal">
                No
              </th>
              <th scope="col">ID</th>
              <th scope="col">Alamat</th>
              <th scope="col">Telpon</th>
              <th scope="col">Deskripsi</th>
              <th scope="col" className="thakhir">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody>
            {supliers.filter((suplier)=>{
              if (
                suplier.id.toLowerCase().includes(search) ||
                suplier.alamat.toLowerCase().includes(search) ||
                suplier.deskripsi.toLowerCase().includes(search) ||
                suplier.id.includes(search) ||
                suplier.alamat.includes(search) ||
                suplier.deskripsi.includes(search)
              ) {
                return true;
              }
              return false;
            }).map((suplier) => {
                return (
                  <tr key={suplier.id}>
                    <th scope="row">{nomor++}</th>
                    <td>{suplier.id}</td>
                    <td>{suplier.alamat}</td>
                    <td>{suplier.no_tlp}</td>
                    <td>{suplier.deskripsi}</td>
                    <td>
                      <Fragment>
                        <Link to={`/suplier/ubah/${suplier.id}`}>
                          <button className="btn btn-success btn-sm">
                            Ubah
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ml-1 btn-sm"
                          onClick={() => handleDelete(suplier.id)}
                        >
                          Hapus
                        </button>
                      </Fragment>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suplier;
