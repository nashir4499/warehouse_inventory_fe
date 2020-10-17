import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import Barcode from "react-barcode";
import { url } from "../../services/config";

function Rak() {
  useEffect(() => {
    checkItem();
  }, []);

  const [raks, setRaks] = useState([]);

  const checkItem = () => {
    Axios.get(`${url}/rak`, { headers: authHeader() })
      .then((res) => {
        setRaks(res.data);
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
      Axios.delete(`${url}/rak/${id}`, { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
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
        <title>Rak</title>
      </Helmet>
      <div className="row">
        <div className="col-md-5 card-lain">
          <h2>Daftar Rak</h2>
          <Link className="btn btn-primary" to="/rak/tambah">
            Tambah Rak Baru
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
              <th scope="col">Nama</th>
              <th scope="col">Volume Rak</th>
              <th scope="col">Ukuran P/L/T</th>
              <th scope="col" className="thakhir">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody>
            {raks.filter((rak)=>{
              if (
                rak.id.toLowerCase().includes(search) ||
                rak.nama.toLowerCase().includes(search) ||
                rak.id.includes(search) ||
                rak.nama.includes(search)
              ) {
                return true;
              }
              return false;
            }).map((rak) => {
                return (
                  <tr key={rak.id}>
                    <th scope="row">{nomor++}</th>
                    {/* <td>{rak.id}</td> */}
                    <td>
                      {
                        <Barcode
                          value={`${rak.id}`}
                          width={1}
                          height={50}
                          renderer={"img"}
                        />
                      }
                    </td>
                    <td>{rak.nama}</td>
                    <td>{rak.volume_rak}cm3</td>
                    <td>
                      {rak.panjang}cm / {rak.lebar}cm / {rak.tinggi}cm
                    </td>
                    <td>
                      <Fragment>
                        <Link to={`/rak/ubah/${rak.id}`}>
                          <button className="btn btn-success btn-sm">
                            Ubah
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger ml-1 btn-sm"
                          onClick={() => handleDelete(rak.id)}
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
        <p>*Panjang/Lebar/Tinggi</p>
      </div>
    </div>
  );
}

export default Rak;
