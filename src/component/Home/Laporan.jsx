import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";

function Laporan() {
  useEffect(() => {
    checkItem();
  }, []);

  const [bMasuks, setBMasuks] = useState([]);
  const [bKeluars, setBKeluars] = useState([]);
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [barangOneForAll, setBarangOneForAll] = useState([]);

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
    Axios.get("http://127.0.0.1:3333/bkeluar", { headers: authHeader() })
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
    Axios.get("http://127.0.0.1:3333/bmasuk/jumlah", { headers: authHeader() })
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
    Axios.get("http://127.0.0.1:3333/bkeluar/jumlah", { headers: authHeader() })
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
    Axios.get("http://127.0.0.1:3333/bmasuk/oneForAll", {
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

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  const StokSatuan = (props) => {
    const [jumlahBM, setJumlahBM] = useState();
    const [jumlahBK, setJumlahBK] = useState();
    Axios.get(`http://127.0.0.1:3333/bmasuk/jumlah/${props.id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setJumlahBM(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    Axios.get(`http://127.0.0.1:3333/bkeluar/jumlah/${props.id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setJumlahBK(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });

    return (
      <Fragment>
        <td>{jumlahBM}</td>
        {jumlahBK > 0 ? <td>{jumlahBK}</td> : <td>0</td>}
        {/* <td>{jumlahBK}</td> */}
        {jumlahBK > 0 ? <td>{jumlahBM - jumlahBK}</td> : <td>{jumlahBM}</td>}
        {/* <td>{jumlahBM - jumlahBK}</td> */}
      </Fragment>
    );
  };

  var noBm = 1;
  var noBk = 1;
  var noBMBK = 1;
  return (
    <div className="laporan container">
      <Helmet>
        <title>Laporan</title>
      </Helmet>
      <h4 className="text-center pt-3">Laporan Keluar Masuk Barang</h4>
      <hr />
      <div className="row">
        <div className="col-sm-6 table-responsive">
          <h5>Barang Masuk</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tanggal Masuk</th>
                <th scope="col">Stok Masuk</th>
              </tr>
            </thead>
            <tbody>
              {bMasuks &&
                bMasuks.map((bMasuk) => {
                  return (
                    <tr key={bMasuk.id}>
                      <th scope="row">{noBm++}</th>
                      <td>{bMasuk.barang.produk}</td>
                      <td>{bMasuk.updated_at}</td>
                      <td>{bMasuk.stock_bm}</td>
                    </tr>
                  );
                })}
              <tr>
                <th scope="col" colSpan="3" className="text-center">
                  Jumlah
                </th>
                <th scope="col">{barangMasuk}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-sm-6 table-responsive">
          <h5>Barang Keluar</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tanggal Keluar</th>
                <th scope="col">Stok Keluar</th>
              </tr>
            </thead>
            <tbody>
              {bKeluars &&
                bKeluars.map((bkeluar) => {
                  return (
                    <tr key={bkeluar.id}>
                      <th scope="row">{noBk++}</th>
                      <td>{bkeluar.barang.produk}</td>
                      <td>{bkeluar.updated_at}</td>
                      <td>{bkeluar.stock_bk}</td>
                    </tr>
                  );
                })}
              <tr>
                <th scope="col" colSpan="3" className="text-center">
                  Jumlah
                </th>
                <th scope="col">{barangKeluar}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm table-responsive">
          <h5 className="text-center">Laporan Setiap Barang</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Stok Masuk</th>
                <th scope="col">Stok Keluar</th>
                <th scope="col">Sisa</th>
              </tr>
            </thead>
            <tbody>
              {barangOneForAll &&
                barangOneForAll.map((OneForAll) => {
                  return (
                    <tr key={OneForAll.id}>
                      <th scope="col">{noBMBK++}</th>
                      <td>{OneForAll.barang.produk}</td>
                      <StokSatuan id={OneForAll.barang_id} />
                    </tr>
                  );
                })}
              <tr>
                <th scope="col" colSpan="2" className="text-center">
                  Jumlah
                </th>
                <th>{barangMasuk}</th>
                <th>{barangKeluar}</th>
                <th>{barangMasuk - barangKeluar}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Laporan;
