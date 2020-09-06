import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";

function BarangMasuk() {
  useEffect(() => {
    checkItem();
  }, []);

  const [bMasuks, setBMasuks] = useState([]);

  const checkItem = () => {
    Axios.get("http://127.0.0.1:3333/bmasuk", { headers: authHeader() })
      .then((res) => {
        setBMasuks(res.data);
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
      Axios.delete(`http://127.0.0.1:3333/bmasuk/${id}`, {
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

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  var nomor = 1;
  return (
    <div className="container mt-4">
      <Helmet>
        <title>Barang Masuk</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 card-lain">
          <h2>Barang Masuk</h2>
          <Link className="btn btn-primary mb-4" to="/barangmasuk/tambah">
            Tambah Barang Masuk
          </Link>
        </div>
      </div>
      <div className="row card-lain table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="thawal">
                No
              </th>
              <th scope="col">Barang</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Suplier</th>
              <th scope="col">Qty</th>
              <th scope="col">Deskripsi</th>
              <th scope="col" className="thakhir">
                opsi
              </th>
            </tr>
          </thead>
          <tbody>
            {bMasuks &&
              bMasuks.map((bMasuk) => {
                return (
                  <tr key={bMasuk.id}>
                    <th scope="row">{nomor++}</th>
                    <td>{bMasuk.barang.produk}</td>
                    <td>{bMasuk.updated_at}</td>
                    <td>{bMasuk.barang.suplier_id}</td>
                    <td>{bMasuk.stock_bm}</td>
                    <td>{bMasuk.deskripsi}</td>
                    <td>
                      <Fragment>
                        <Link to={`/barangmasuk/ubah/${bMasuk.id}`}>
                          <button className="btn btn-success btn-sm">
                            Ubah
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ml-1 btn-sm"
                          onClick={() => handleDelete(bMasuk.id)}
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

export default BarangMasuk;
