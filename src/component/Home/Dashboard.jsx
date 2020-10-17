import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { url } from "../../services/config";
import { Modal } from "@material-ui/core";
import ModalBarangMin from "./ModalBarangMin";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Dashboard(props) {
  const [barangs, setBarangs] = useState([]);
  const [raks, setRaks] = useState([]);
  const [stokRak, setstokRak] = useState([]);
  const [rakTerpakais, setRakTerpakais] = useState([]);
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [suplier, setSuplier] = useState([]);
  const [pilihRak, setPilihRak] = useState({
    id: "",
    nama: "",
    volume_rak: "",
    panjang: "",
    lebar: "",
    tinggi: "",
  });
  const [pilihBarang, setPilihBarang] = useState({
    id: "",
    produk: "",
    suplier_id: "",
    kategori_id: "",
    stok: "",
    volume_barang: "",
    panjang: "",
    lebar: "",
    tinggi: "",
    deskripsi: "",
  });
  const [lanjurPilih, setLanjutPilih] = useState(false);
  const [jumlahVBarang, setJumlahVBarang] = useState("");
  const [barangOneForAll, setBarangOneForAll] = useState([]);
  // const [cetak, setCetak] = useState();

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
        setstokRak(res.data);
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
    Axios.get(`${url}/rakterpakai/oneForAll`, {
      headers: authHeader(),
    })
      .then((res) => {
        setBarangOneForAll(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  const rakTersedia = stokRak + rakTerpakais - rakTerpakais;
  const stokMed = Math.round((stokRak + rakTerpakais) / 2);

  const pilihItemRak = (rak_id) => {
    Axios.get(`${url}/rak/${rak_id}`, { headers: authHeader() })
      .then((res) => {
        // console.log(res.data)
        const selectedRack = res.data;
        setPilihRak({
          ...pilihRak,
          id: selectedRack.id,
          nama: selectedRack.nama,
          volume_rak: selectedRack.volume_rak,
          panjang: selectedRack.panjang,
          lebar: selectedRack.lebar,
          tinggi: selectedRack.tinggi,
        });
        setJumlahVBarang(
          selectedRack.volume_rak - pilihBarang.volume_barang * pilihBarang.stok
        );
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
    setPilihRak({
      id: "",
      nama: "",
      volume_rak: "",
      panjang: "",
      lebar: "",
      tinggi: "",
    });
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
          stok: selectedItem.stok,
          volume_barang: selectedItem.volume_barang,
          panjang: selectedItem.panjang,
          lebar: selectedItem.lebar,
          tinggi: selectedItem.tinggi,
          deskripsi: selectedItem.deskripsi,
        });
        setLanjutPilih(true);
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
    // if (pilihRak.volume_rak > 0 && pilihBarang.stok > 0) {
    if (pilihBarang.stok > 0) {
      // const stok = pilihRak.volume_rak - pilihBM.stok_bm;
      // const currantstokRak = pilihRak.volume_rak - pilihBarang.volume_barang;

      const jmlBM = pilihRak.volume_rak / pilihBarang.volume_barang;
      const jmlVB = pilihBarang.volume_barang * pilihBarang.stok;
      const stokBnR = Math.floor(jmlBM) - pilihBarang.stok;
      //   console.log(stokBnR);
      if (stokBnR < 0) {
        const stokfix = Math.abs(stokBnR);
        const volumeMasuk =
          (pilihBarang.stok - stokfix) * pilihBarang.volume_barang;
        const rakVSisa = pilihRak.volume_rak % pilihBarang.volume_barang;
        // console.log(stokfix);
        Axios.post(
          `${url}/rak/${pilihRak.id}`,
          {
            id: pilihRak.id,
            nama: pilihRak.nama,
            volume_rak: rakVSisa,
            panjang: pilihRak.panjang,
            lebar: pilihRak.lebar,
            tinggi: pilihRak.tinggi,
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
            stok: stokfix,
            volume_barang: pilihBarang.volume_barang,
            panjang: pilihBarang.panjang,
            lebar: pilihBarang.lebar,
            tinggi: pilihBarang.tinggi,
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
            stok: pilihBarang.stok - stokfix,
            volume_terpakai: volumeMasuk,
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
            stok_bm: pilihBarang.stok - stokfix,
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
            volume_rak: pilihRak.volume_rak - jmlVB,
            panjang: pilihRak.panjang,
            lebar: pilihRak.lebar,
            tinggi: pilihRak.tinggi,
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
            stok: 0,
            volume_barang: pilihBarang.volume_barang,
            panjang: pilihBarang.panjang,
            lebar: pilihBarang.lebar,
            tinggi: pilihBarang.tinggi,
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
            stok: pilihBarang.stok,
            volume_terpakai: jmlVB,
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
            stok_bm: pilihBarang.stok,
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
      alert("Stok Barang Kosong");
    }
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  // var cetak;

  const stokSatuan = (id, setData) => {
    Axios.get(`${url}/rakterpakai/jumlah/${id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  const StokDikit = (id) => {
    const [cetaks, setCetaks] = useState();
    stokSatuan(id, setCetaks);
      return cetaks;

  }

  const StokSatuan = (props) => {
    const [jumlahBA, setJumlahBA] = useState();
    // console.log(props);
    stokSatuan(props.barang.barang_id, setJumlahBA)
    return (
      jumlahBA < 15 && (
        <div>
          <h6 style={{ color: "red" }}>{props.barang.barang.produk}</h6>
          <h6 style={{ color: "red" }}>{jumlahBA}</h6>
        </div>
      )
    );
  };

  const Carousels = () => {
    // modal
    const [open, setOpen] = useState(false);
    const handleModalOpen = () => {
      setOpen(true);
    };
    const handleModalClose = () => {
      setOpen(false);
    };
    const settings = {
      dots: false,
      autoplay: true,
      infinite: true,
    };

    return (
      <div>
        <h6>Barang Dengan Stok Sedikit</h6>
        <Slider {...settings}>
          {barangOneForAll &&
            barangOneForAll.map((OneForAll) => {
              const cetak = StokDikit(OneForAll.barang_id);
              return (
                cetak < 15 &&
                <StokSatuan barang={OneForAll} key={OneForAll.id} />
              );
            })}
        </Slider>
        <button
          className="btn btn-danger ml-1 btn-sm"
          //   onClick={() => handleKeluar(isiRak.id)}
          onClick={() => handleModalOpen()}
        >
          Detail Barang Sedikit
        </button>
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="">
            <ModalBarangMin />
          </div>
        </Modal>
      </div>
    );
  };

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
              <h6>Volume Rak Tersedia</h6>
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
                  rakTersedia >= stokMed
                    ? "rgba(255, 176, 176)"
                    : "rgba(183, 255, 173)",
                borderRadius: "10px",
              }}
            >
              <h6>Stok barang dalam rak</h6>
              <br />
              <h4>
                <b>
                  {rakTersedia >= stokMed ? "Dibawah Standar" : "Diatas Standa"}
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div className=" mb-3 col-md-4">
          <div className="card card-dashboard">
            <div className="card-body text-center body-laporan">
              <Carousels />
            </div>
          </div>
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
                      id="barangs"
                      name="barangs"
                      onChange={(e) => pilihItemBarang(e.target.value)}
                    >
                      <option defaultValue>Choose...</option>
                      {barangs &&
                        barangs.map((barang) => {
                          // const cek = barang.stok - barang.stok.length > 0;
                          // return (
                          //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stok - barang.stok.length} | </option>
                          // )
                          return (
                            <option key={barang.id} value={barang.id}>
                              {barang.produk} || {barang.stok} ||{" "}
                              {barang.volume_barang}cm3
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
                        placeholder="stok"
                        value={pilihBarang.stok}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="custom-select mb-3"
                      id="raks"
                      name="raks"
                      onChange={(e) => pilihItemRak(e.target.value)}
                      disabled={lanjurPilih === false}
                    >
                      <option defaultValue>Choose...</option>
                      {raks &&
                        raks.map((rak) => {
                          // const cek = barang.stok - barang.stok.length > 0;
                          // return (
                          //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stok - barang.stok.length} | </option>
                          // )
                          for (var i = 0; i < barangs.length; i++) {
                            const modulus =
                              rak.volume_rak % pilihBarang.volume_barang;
                            if (
                              (modulus === 0 && rak.volume_rak !== 0) ||
                              (modulus % barangs[i].volume_barang === 0 &&
                                rak.volume_rak !== 0)
                            ) {
                              return (
                                <option key={rak.id} value={rak.id}>
                                  {rak.nama} || {rak.volume_rak}cm3
                                </option>
                              );
                            }
                          }
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
                        placeholder="Volume Rak"
                        value={pilihRak.volume_rak}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sisa Volume Rak"
                        value={jumlahVBarang}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    {/* <button type="button" className="btn btn-success float-right" onClick={pilihItem}>Cek</button> */}
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Masukan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
