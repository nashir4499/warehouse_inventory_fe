import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import Barcode from "react-barcode";
import { url } from "../../services/config";

function Barang() {
  useEffect(() => {
    checkItem();
  }, []);

  const [barangs, setBarangs] = useState([]);

  const checkItem = () => {
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

  const handleDelete = (id) => {
    if (window.confirm("Hapus Item?")) {
      Axios.delete(`${url}/barang/${id}`, {
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
        <title>Barang</title>
      </Helmet>
      <div className="row">
        <div className="col-md-5 card-lain">
          <h2>Data Barang</h2>
          <Link className="btn btn-primary" to="/barang/tambah">
            Tambah Barang
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
        {/* <div className="row pb-3">
          <div className="col-md-6 offset-md-3 rowSearch">
            <input
              className="form-control search"
              type="text"
              value={search}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cari barang"
            />
          </div>
        </div> */}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="thawal">
                No
              </th>
              <th scope="col">Barcode</th>
              <th scope="col">Nama Produk</th>
              <th scope="col">Suplier</th>
              <th scope="col">Kategori</th>
              <th scope="col">Stok</th>
              <th scope="col">Volume</th>
              <th scope="col">Deskripsi</th>
              <th scope="col" className="thakhir">
                opsi
              </th>
            </tr>
          </thead>
          <tbody>
            {barangs.filter((barang)=>{
              if (
                barang.produk.toLowerCase().includes(search) ||
                barang.suplier.id.toLowerCase().includes(search) ||
                barang.kategori.nama.toLowerCase().includes(search) ||
                barang.deskripsi.toLowerCase().includes(search) ||
                barang.produk.includes(search) ||
                barang.suplier.id.includes(search) ||
                barang.kategori.nama.includes(search) ||
                barang.deskripsi.includes(search)
              ) {
                return true;
              }
              return false;
            }).map((barang) => {
                return (
                  <tr key={barang.id}>
                    <th scope="row">{nomor++}</th>
                    <td>
                      <Barcode
                        value={`${barang.id}`}
                        width={1}
                        height={50}
                        renderer={"img"}
                      />
                    </td>
                    <td>{barang.produk}</td>
                    <td>{barang.suplier.id}</td>
                    <td>{barang.kategori.nama}</td>
                    <td>{barang.stok}</td>
                    <td>{barang.volume_barang}cm3</td>
                    <td>{barang.deskripsi}</td>
                    <td>
                      <Fragment>
                        <Link to={`/barang/ubah/${barang.id}`}>
                          <button className="btn btn-success btn-sm">
                            Ubah
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ml-1 btn-sm"
                          onClick={() => handleDelete(barang.id)}
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

export default Barang;
