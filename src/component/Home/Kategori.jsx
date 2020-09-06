import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";

function Kategori() {
  useEffect(() => {
    checkItem();
  }, []);

  const [tambahKolom, setTambahKolom] = useState(false);
  const [ubahKolom, setUbahKolom] = useState(false);

  const [kategoris, setKategoris] = useState([]);

  const checkItem = () => {
    Axios.get("http://127.0.0.1:3333/kategori", { headers: authHeader() })
      .then((res) => {
        setKategoris(res.data);
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
      Axios.delete(`http://127.0.0.1:3333/kategori/${id}`, {
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

  //tambah
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
      "http://127.0.0.1:3333/kategori",
      {
        id: data.id,
        nama: data.nama,
      },
      { headers: authHeader() }
    )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  //Ubah

  const [dataUbah, setDataUbah] = useState({
    id: "",
    nama: "",
  });

  const handleChangeUbah = (nama, value) => {
    setDataUbah({
      ...dataUbah,
      [nama]: value,
    });
  };

  const Ukolom = (id) => {
    setUbahKolom(true);
    checkItemUbah(id);
  };

  const checkItemUbah = (id) => {
    Axios.get(`http://127.0.0.1:3333/kategori/${id}`, { headers: authHeader() })
      .then((res) => {
        setDataUbah({
          id: res.data.id,
          nama: res.data.nama,
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

  const savePerubahan = (e) => {
    e.preventDefault();
    Axios.post(
      `http://127.0.0.1:3333/kategori/${dataUbah.id}`,
      {
        id: dataUbah.id,
        nama: dataUbah.nama,
      },
      { headers: authHeader() }
    )
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
  };

  var nomor = 1;

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Kategori</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 card-lain">
          <h2>Daftar Kategori</h2>
          <button
            className="btn btn-primary mb-4"
            onClick={
              tambahKolom
                ? () => setTambahKolom(false)
                : () => setTambahKolom(true)
            }
          >
            Tambah Kategori Baru
          </button>
        </div>
        {tambahKolom && ( // "?" if yang memiliki elsenya
          <div className="col-md-5 offset-md-1 card-lain kat-kolom mt-2">
            <form onSubmit={savePinjam}>
              <input
                type="text"
                className="form-control"
                value={data.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                placeholder="Nama Kategori"
              />
              <button className="btn btn-success mt-3" type="submit">
                Simpan
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-6 card-lain table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="thawal">
                  No
                </th>
                <th scope="col">Nama</th>
                <th scope="col" className="thakhir">
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              {kategoris &&
                kategoris.map((kategori) => {
                  return (
                    <tr key={kategori.id}>
                      <th scope="row">{nomor++}</th>
                      <td>{kategori.nama}</td>
                      <td>
                        <Fragment>
                          {/* <Link to={`/kategori/ubah/${kategori.id}`}><button className="btn btn-warning btn-sm">Ubah</button></Link> */}
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={
                              ubahKolom
                                ? () => setUbahKolom(false)
                                : () => Ukolom(kategori.id)
                            }
                          >
                            Ubah
                          </button>
                          <button
                            className="btn btn-danger ml-1 btn-sm"
                            onClick={() => handleDelete(kategori.id)}
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
        {ubahKolom && ( // "?" if yang memiliki elsenya
          <div className="col-md-5 offset-md-1 card-lain kat-kolom mt-3">
            <form onSubmit={savePerubahan}>
              <h6>Ubah Kategori</h6>
              <input
                type="hidden"
                value={dataUbah.id}
                onChange={(e) => handleChangeUbah("id", e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={dataUbah.nama}
                onChange={(e) => handleChangeUbah("nama", e.target.value)}
              />
              <button className="btn btn-success mt-3" type="submit">
                Simpan
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kategori;
