import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function BarangKeluar() {
  useEffect(() => {
    checkItem();
  }, []);

  const [bKeluars, setBKeluars] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/bkeluar`, { headers: authHeader() })
      .then((res) => {
        setBKeluars(res.data);
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
      Axios.delete(`${url}/bkeluar/${id}`, {
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
        <title>Barang Keluar</title>
      </Helmet>
      <div className="row">
        <div className="col-md-5 card-lain">
          <h2>Barang Keluar</h2>
          <Link className="btn btn-primary" to="/barangkeluar/tambah">
            Tambah Barang Keluar
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
            {bKeluars.filter((bKeluar)=>{
              if (
                bKeluar.barang.produk.toLowerCase().includes(search) ||
                bKeluar.barang.suplier_id.toLowerCase().includes(search) ||
                bKeluar.deskripsi.toLowerCase().includes(search) ||
                bKeluar.barang.produk.includes(search) ||
                bKeluar.barang.suplier_id.includes(search) ||
                bKeluar.deskripsi.includes(search)
              ) {
                return true;
              }
              return false;
            }).map((bKeluar) => {
                return (
                  <tr key={bKeluar.id}>
                    <th scope="row">{nomor++}</th>
                    <td>{bKeluar.barang.produk}</td>
                    <td>{bKeluar.updated_at}</td>
                    <td>{bKeluar.barang.suplier_id}</td>
                    <td>{bKeluar.stok_bk}</td>
                    <td>{bKeluar.deskripsi}</td>
                    <td>
                      <Fragment>
                        <Link to={`/barangkeluar/ubah/${bKeluar.id}`}>
                          <button className="btn btn-success btn-sm">
                            Ubah
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ml-1 btn-sm"
                          onClick={() => handleDelete(bKeluar.id)}
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

export default BarangKeluar;
