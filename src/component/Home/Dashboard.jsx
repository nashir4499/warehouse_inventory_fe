import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { url } from "../../services/config";

function Dashboard(props) {
  const [barangs, setBarangs] = useState([]);
  const [raks, setRaks] = useState([]);
  const [stockRak, setStockRak] = useState([]);
  const [rakTerpakais, setRakTerpakais] = useState([]);
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [suplier, setSuplier] = useState([]);
  const [pilihRak, setPilihRak] = useState({
    id: "",
    nama: "",
    stock_max: "",
  });
  const [pilihBarang, setPilihBarang] = useState({
    id: "",
    produk: "",
    suplier_id: "",
    kategori_id: "",
    stock: "",
    deskripsi: "",
  });

  useEffect(() => {
    checkItem();
  }, []);

  const checkItem = () => {
    Axios.get(`${url}/bmasuk/jumlah`, { headers: authHeader() })
      .then((res) => {
        setBarangMasuk(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/suplier/jumlah`, { headers: authHeader() })
      .then((res) => {
        setSuplier(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/bkeluar/jumlah`, { headers: authHeader() })
      .then((res) => {
        setBarangKeluar(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/rakterpakai/jumlah`, {
      headers: authHeader(),
    })
      .then((res) => {
        setRakTerpakais(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`${url}/rak/jumlah`, { headers: authHeader() })
      .then((res) => {
        setStockRak(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    // Axios.get(`${url}/bmasuk`)
    //     .then((res) => {
    //         setBarangMasuks(res.data)
    //     }).catch(err => {
    // if (err.response.status === 401) {
    //     localStorage.removeItem('token')
    //     window.location.reload()
    // }
    //         console.log(err)
    //     })
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

  const rakTersedia = stockRak + rakTerpakais - rakTerpakais;
  const stockMed = Math.round((stockRak + rakTerpakais) / 2);

  const pilihItemRak = (rak_id) => {
    Axios.get(`${url}/rak/${rak_id}`, { headers: authHeader() })
      .then((res) => {
        // console.log(res.data)
        const selectedRack = res.data;
        setPilihRak({
          ...pilihRak,
          id: selectedRack.id,
          nama: selectedRack.nama,
          stock_max: selectedRack.stock_max,
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

  const pilihItemBarang = (barang_id) => {
    Axios.get(`${url}/barang/${barang_id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        // console.log(res.data)
        const selectedItem = res.data;
        setPilihBarang({
          ...pilihBarang,
          id: selectedItem.id,
          produk: selectedItem.produk,
          suplier_id: selectedItem.suplier_id,
          kategori_id: selectedItem.kategori_id,
          stock: selectedItem.stock,
          deskripsi: selectedItem.deskripsi,
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

  const simpanBarang = (e) => {
    e.preventDefault();
    if (pilihRak.stock_max > 0 && pilihBarang.stock > 0) {
      // const stok = pilihRak.stock_max - pilihBM.stock_bm;
      const currantStockRak = pilihRak.stock_max - pilihBarang.stock;
      //   console.log(currantStockRak);
      if (currantStockRak < 0) {
        const stockfix = Math.abs(currantStockRak);
        // console.log(stockfix);
        Axios.post(
          `${url}/rak/${pilihRak.id}`,
          {
            id: pilihRak.id,
            nama: pilihRak.nama,
            stock_max: 0,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            // setPilihRak(res.data)
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });
        Axios.post(
          `${url}/barang/${pilihBarang.id}`,
          {
            id: pilihBarang.id,
            produk: pilihBarang.produk,
            suplier_id: pilihBarang.suplier_id,
            kategori_id: pilihBarang.kategori_id,
            stock: stockfix,
            deskripsi: pilihBarang.deskripsi,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            // setPilihBM(res.data)
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });

        Axios.post(
          `${url}/rakterpakai`,
          {
            stock: pilihBarang.stock - stockfix,
            rak_id: pilihRak.id,
            barang_id: pilihBarang.id,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            // window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });
        Axios.post(
          `${url}/bmasuk`,
          {
            stock_bm: pilihBarang.stock - stockfix,
            deskripsi: "Ditambahkan",
            barang_id: pilihBarang.id,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            alert("Barang Berhasil DiMasukkan");
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });
      } else {
        Axios.post(
          `${url}/rak/${pilihRak.id}`,
          {
            id: pilihRak.id,
            nama: pilihRak.nama,
            stock_max: pilihRak.stock_max - pilihBarang.stock,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            // setPilihRak(res.data)
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });
        Axios.post(
          `${url}/barang/${pilihBarang.id}`,
          {
            id: pilihBarang.id,
            produk: pilihBarang.produk,
            suplier_id: pilihBarang.suplier_id,
            kategori_id: pilihBarang.kategori_id,
            stock: 0,
            deskripsi: pilihBarang.deskripsi,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            // setPilihBM(res.data)
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            }
            console.log(err);
          });

        Axios.post(
          `${url}/rakterpakai`,
          {
            stock: pilihBarang.stock,
            rak_id: pilihRak.id,
            barang_id: pilihBarang.id,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              // window.location.reload()
            }
            console.log(err);
          });
        Axios.post(
          `${url}/bmasuk`,
          {
            stock_bm: pilihBarang.stock,
            deskripsi: "Ditambahkan",
            barang_id: pilihBarang.id,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res.data);
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              alert("Barang Berhasil Ditambahkan");
              window.location.reload();
            }
            console.log(err);
          });
      }
    } else {
      alert("Stok Rak Penuh atau Stok Barang Kosong");
    }
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* baris pertama */}
      <div className="row">
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            <div className="card-body">
              <h1>{barangMasuk}</h1>
              <h6>Barang Masuk</h6>
              <div className="row text-right mInfo">
                <div className="col">
                  <Link className="card-link" to="/barangmasuk">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            <div className="card-body">
              <h1>{barangKeluar}</h1>
              <h6>Barang Keluar</h6>
              <div className="row text-right mInfo">
                <div className="col">
                  <Link className="card-link" to="/barangkeluar">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            <div className="card-body">
              <h1>{rakTersedia}</h1>
              <h6>Rak Tersedia</h6>
              <div className="row text-right mInfo">
                <div className="col">
                  <Link className="card-link" to="/isirak">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* baris ke dua */}
      <div className="row">
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            <div className="card-body">
              <h1>{suplier}</h1>
              <h6>Jumlah Suplier</h6>
              <div className="row text-right mInfo">
                <div className="col">
                  <Link className="card-link" to="/suplier">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            {/* rakTersedia >= 32 ? 'rgba(255, 176, 176)' : 'rgba(255, 176, 176)' */}
            <div
              className="card-body"
              style={{
                background:
                  rakTersedia >= stockMed
                    ? "rgba(255, 176, 176)"
                    : "rgba(183, 255, 173)",
                borderRadius: "10px",
              }}
            >
              <h6>Stok barang dalam rak</h6>
              <br />
              <h4>
                <b>
                  {rakTersedia >= stockMed
                    ? "Dibawah Standar"
                    : "Diatas Standa"}
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div className=" mb-3 col-md-4">
          <Link className="card-link" to="/laporan">
            <div className="card card-dashboard">
              <div className="card-body text-center body-laporan">
                <h2>
                  <b>Laporan</b>
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* baris ke tiga */}
      <div className="row">
        <div className="col">
          <div className="card card-dashboard">
            <div className="card-body">
              <form onSubmit={simpanBarang}>
                <div className="row">
                  <div className="col-md-6">
                    <select
                      className="custom-select mb-3"
                      id="raks"
                      name="raks"
                      onChange={(e) => pilihItemRak(e.target.value)}
                    >
                      <option defaultValue>Choose...</option>
                      {raks &&
                        raks.map((rak) => {
                          // const cek = barang.stock - barang.stock.length > 0;
                          // return (
                          //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stock - barang.stock.length} | </option>
                          // )
                          return (
                            <option key={rak.id} value={rak.id}>
                              {rak.nama} || {rak.stock_max}
                            </option>
                          );
                        })}
                    </select>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rak Id"
                        value={pilihRak.id}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Stock"
                        value={pilihRak.stock_max}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="custom-select mb-3"
                      id="barangs"
                      name="barangs"
                      onChange={(e) => pilihItemBarang(e.target.value)}
                    >
                      <option defaultValue>Choose...</option>
                      {barangs &&
                        barangs.map((barang) => {
                          // const cek = barang.stock - barang.stock.length > 0;
                          // return (
                          //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stock - barang.stock.length} | </option>
                          // )
                          return (
                            <option key={barang.id} value={barang.id}>
                              {barang.id} || {barang.stock}
                            </option>
                          );
                        })}
                    </select>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Serial Barang "
                        value={pilihBarang.id}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Stock"
                        value={pilihBarang.stock}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* <button type="button" className="btn btn-success float-right" onClick={pilihItem}>Cek</button> */}
                <button type="submit" className="btn btn-primary float-right">
                  Masukan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
