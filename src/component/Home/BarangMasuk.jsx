import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import { url } from "../../services/config";

function BarangMasuk() {
  useEffect(() => {
    checkItem();
  }, []);

  const [bMasuks, setBMasuks] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/bmasuk`, { headers: authHeader() })
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
      Axios.delete(`${url}/bmasuk/${id}`, {
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
        <title>Barang Masuk</title>
      </Helmet>
      <div className="row">
        <div className="col-md-5 card-lain">
          <h2>Barang Masuk</h2>
          <Link className="btn btn-primary" to="/barangmasuk/tambah">
            Tambah Barang Masuk
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
            {bMasuks.filter((bMasuk)=>{
              if (
                bMasuk.barang.produk.toLowerCase().includes(search) ||
                bMasuk.barang.suplier_id.toLowerCase().includes(search) ||
                bMasuk.deskripsi.toLowerCase().includes(search) ||
                bMasuk.barang.produk.includes(search) ||
                bMasuk.barang.suplier_id.includes(search) ||
                bMasuk.deskripsi.includes(search)
              ) {
                return true;
              }
              return false;
            }).map((bMasuk) => {
                return (
                  <tr key={bMasuk.id}>
                    <th scope="row">{nomor++}</th>
                    <td>{bMasuk.barang.produk}</td>
                    <td>{bMasuk.updated_at}</td>
                    <td>{bMasuk.barang.suplier_id}</td>
                    <td>{bMasuk.stok_bm}</td>
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
