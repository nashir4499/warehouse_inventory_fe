import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import { useEffect } from "react";
import { url } from "../../services/config";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    boxShadow: "5px 5px 5px #000",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalKeluar(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [semua, setSemua] = useState(false);
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    getIsirak();
  }, []);

  //   const [isiRak, setIsiRak] = useState({});
  const [isiRak, setIsiRak] = useState({
    id: "",
    stok: "",
    volume_terpakai: "",
    rak_id: "",
    barang_id: "",
    barang: {},
    rak: {},
  });

  const getIsirak = () => {
    Axios.get(`${url}/rakterpakai/${props.idRak}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setIsiRak({
          id: res.data.id,
          stok: res.data.stok,
          volume_terpakai: res.data.volume_terpakai,
          rak_id: res.data.rak_id,
          barang_id: res.data.barang_id,
          barang: res.data.barang,
          rak: res.data.rak,
        });
        // setIsiRak(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
  };

  //keluarkan semua
  const handleKeluarSemua = () => {
    if (window.confirm(`Keluarkan ${isiRak.barang.produk}?`)) {
      // console.log(isiRak.rak.volume_rak + isiRak.stok)
      Axios.post(
        `${url}/bkeluar`,
        {
          stok_bk: isiRak.stok,
          deskripsi: "Barang Keluar",
          barang_id: isiRak.barang_id,
        },
        { headers: authHeader() }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
      Axios.post(
        `${url}/rak/${isiRak.rak_id}`,
        {
          id: isiRak.rak.id,
          nama: isiRak.rak.nama,
          volume_rak: isiRak.rak.volume_rak + isiRak.volume_terpakai,
          panjang: isiRak.rak.panjang,
          lebar: isiRak.rak.lebar,
          tinggi: isiRak.rak.tinggi,
        },
        { headers: authHeader() }
      )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
      Axios.delete(`${url}/rakterpakai/${isiRak.id}`, {
        headers: authHeader(),
      }) //pake bactrik kalo mau ngirim parameter
        .then((response) => {
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

  const sebagian = (e) => {
    e.preventDefault();
    if (window.confirm(`Keluarkan ${jumlah} buah ${isiRak.barang.produk}?`)) {
      // console.log(res.data.rak.volume_rak + res.data.stok)
      // console.log(isiRak.barang.volume_barang);
      const volumeKeluar = isiRak.barang.volume_barang * jumlah;
      Axios.post(
        `${url}/bkeluar`,
        {
          stok_bk: jumlah,
          deskripsi: "Barang Keluar",
          barang_id: isiRak.barang_id,
        },
        { headers: authHeader() }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
      Axios.post(
        `${url}/rak/${isiRak.rak_id}`,
        {
          id: isiRak.rak.id,
          nama: isiRak.rak.nama,
          volume_rak: isiRak.rak.volume_rak + volumeKeluar,
          panjang: isiRak.rak.panjang,
          lebar: isiRak.rak.lebar,
          tinggi: isiRak.rak.tinggi,
        },
        { headers: authHeader() }
      )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
          console.log(err);
        });
      Axios.post(
        `${url}/rakterpakai/${isiRak.id}`,
        {
          id: isiRak.id,
          stok: isiRak.stok - jumlah,
          volume_terpakai: isiRak.volume_terpakai - volumeKeluar,
          rak_id: isiRak.rak_id,
          barang_id: isiRak.barang_id,
        },
        { headers: authHeader() }
      ) //pake bactrik kalo mau ngirim parameter
        .then((response) => {
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

  return (
    <div style={modalStyle} className={classes.paper}>
      <h6 id="simple-modal-title">
        {isiRak.barang.produk} dari rak {isiRak.rak.nama}
      </h6>
      <p>stok yang ada {isiRak.stok}. Pilih jumlah yang akan dikeluarkan</p>
      <div className="row text-center">
        {isiRak.stok > 1 && (
          <div className="col-sm-6">
            <input
              className="form-check-input"
              type="radio"
              id="sebagian"
              name="gender"
              value="sebagian"
              checked={semua === false}
              onChange={() => setSemua(false)}
            />
            <label htmlFor="sebagian"> Sebagain</label>
          </div>
        )}
        <div className="col-sm-6">
          <input
            className="form-check-input"
            type="radio"
            id="semua"
            name="gender"
            value="semua"
            checked={semua === true}
            onChange={() => setSemua(true)}
          />
          <label htmlFor="semua"> Semua</label>
        </div>
      </div>
      <div className="mt-2 text-center">
        {semua ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleKeluarSemua()}
          >
            Keluarkan Semua
          </button>
        ) : (
          <form onSubmit={sebagian}>
            <small id="emailHelp" className="form-text text-muted">
              Masukkan jumlah barang yang akan dikeluarkan
            </small>
            <div className="row mt-1">
              <div className="col-sm-6 offset-3">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  id="myNumber"
                  placeholder="jumlah barang"
                  min="1"
                  max={isiRak.stok - 1}
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-danger btn-sm mt-3" type="submit">
              Barang Keluar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
