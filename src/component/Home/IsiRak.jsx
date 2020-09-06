import React, { useEffect, useState, Fragment, useMemo } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import ModalKeluar from "./ModalKeluar";
import { Modal } from "@material-ui/core";

function IsiRak() {
  useEffect(() => {
    checkItem();
  }, []);

  const [isiRaks, setIsiRaks] = useState([]);
  const [open, setOpen] = useState(false);
  const [idRak, setIdRak] = useState("");

  const checkItem = () => {
    Axios.get("http://127.0.0.1:3333/rakterpakai", { headers: authHeader() })
      .then((res) => {
        setIsiRaks(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  // modal
  const handleModalOpen = (id) => {
    setIdRak(id);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  //barang keluar
  //   const handleKeluar = (id) => {
  //     Axios.get(`http://127.0.0.1:3333/rakterpakai/${id}`, {
  //       headers: authHeader(),
  //     })
  //       .then((res) => {
  //         console.log(res.data.rak.nama);
  //         if (window.confirm(`Keluarkan ${res.data.barang.produk}?`)) {
  //           // console.log(res.data.rak.stock_max + res.data.stock)
  //           Axios.post(
  //             "http://127.0.0.1:3333/bkeluar",
  //             {
  //               stock_bk: res.data.stock,
  //               deskripsi: "Barang Keluar",
  //               barang_id: res.data.barang_id,
  //             },
  //             { headers: authHeader() }
  //           )
  //             .then((response) => {
  //               console.log(response);
  //             })
  //             .catch((err) => {
  //               if (err.response.status === 401) {
  //                 localStorage.removeItem("token");
  //                 window.location.reload();
  //               }
  //               console.log(err);
  //             });
  //           Axios.post(
  //             `http://127.0.0.1:3333/rak/${res.data.rak_id}`,
  //             {
  //               id: res.data.rak.id,
  //               nama: res.data.rak.nama,
  //               stock_max: res.data.rak.stock_max + res.data.stock,
  //             },
  //             { headers: authHeader() }
  //           )
  //             .then((response) => {
  //               console.log(response.data);
  //             })
  //             .catch((err) => {
  //               if (err.response.status === 401) {
  //                 localStorage.removeItem("token");
  //                 window.location.reload();
  //               }
  //               console.log(err);
  //             });
  //           Axios.delete(`http://127.0.0.1:3333/rakterpakai/${id}`, {
  //             headers: authHeader(),
  //           }) //pake bactrik kalo mau ngirim parameter
  //             .then((response) => {
  //               window.location.reload();
  //             })
  //             .catch((err) => {
  //               if (err.response.status === 401) {
  //                 localStorage.removeItem("token");
  //                 window.location.reload();
  //               }
  //               console.log(err);
  //             });
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 401) {
  //           localStorage.removeItem("token");
  //           window.location.reload();
  //         }
  //         console.log(err);
  //       });
  //   };

  //search
  const [search, setInput] = useState("");

  //sorting
  const useSortableData = (itmeRaks, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortIRaks = useMemo(() => {
      let sortItmeRaks = [...itmeRaks];
      if (sortConfig !== null) {
        sortItmeRaks.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortItmeRaks;
    }, [itmeRaks, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { itmeRaks: sortIRaks, requestSort, sortConfig };
  };

  const { itmeRaks, requestSort, sortConfig } = useSortableData(isiRaks);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  var nomor = 1;
  return (
    <div className="container mt-4">
      <Helmet>
        <title>Isi Rak</title>
      </Helmet>
      <div className="row ">
        <div className="col-md-8 offset-md-2 text-center card-lain">
          <h2>
            <b> Data barang yang ada di rak</b>
          </h2>
        </div>
      </div>

      <div className="container card-lain">
        <div className="row pb-3">
          <div className="col-md-6 offset-md-3 rowSearch">
            <input
              className="form-control search"
              type="text"
              value={search}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cari Nama Rak atau Produk"
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="thawal">
                  No
                </th>
                <th
                  scope="col"
                  onClick={() => requestSort("stock")}
                  className={getClassNamesFor("stock")}
                >
                  Stock
                </th>
                <th
                  scope="col"
                  onClick={() => requestSort("rak_id")}
                  className={getClassNamesFor("rak_id")}
                >
                  Rak Nama
                </th>
                <th
                  scope="col"
                  onClick={() => requestSort("barang_id")}
                  className={getClassNamesFor("barang_id")}
                >
                  Barang Masuk
                </th>
                <th
                  scope="col"
                  onClick={() => requestSort("updated_at")}
                  className={getClassNamesFor("updated_at")}
                >
                  Tanggal
                </th>
                <th scope="col" className="thakhir">
                  opsi
                </th>
              </tr>
            </thead>
            <tbody>
              {
                // isiRaks.filter(isiRak => {
                itmeRaks
                  .filter((isiRak) => {
                    // if (!search) return true;
                    // // if (isiRak.rak.nama.toLowerCase().includes(search) || isiRak.barang.produk.toLowerCase().includes(search)) {
                    if (
                      isiRak.rak.nama.toLowerCase().includes(search) ||
                      isiRak.barang.produk.toLowerCase().includes(search) ||
                      isiRak.rak.nama.includes(search) ||
                      isiRak.barang.produk.includes(search)
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((isiRak) => {
                    return (
                      <tr key={isiRak.id}>
                        <th scope="row">{nomor++}</th>
                        <td>{isiRak.stock}</td>
                        <td value={isiRak.rak_id}>{isiRak.rak.nama}</td>
                        <td value={isiRak.barang_id}>{isiRak.barang.produk}</td>
                        <td>{isiRak.updated_at}</td>
                        <td>
                          <Fragment>
                            {/* <Link to={`/isirak/ubah/${isiRak.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link> */}
                            <button
                              className="btn btn-danger ml-1 btn-sm"
                              //   onClick={() => handleKeluar(isiRak.id)}
                              onClick={() => handleModalOpen(isiRak.id)}
                            >
                              barang Keluar
                            </button>
                          </Fragment>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="">
          <ModalKeluar idRak={idRak} />
        </div>
      </Modal>
    </div>
  );
}

export default IsiRak;
