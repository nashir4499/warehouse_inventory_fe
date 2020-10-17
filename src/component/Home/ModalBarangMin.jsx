import React, { Fragment, useState } from "react";
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

export default function ModalBarangMin(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [barangOneForAll, setBarangOneForAll] = useState([]);

  useEffect(() => {
    checkItem();
  }, []);

  const checkItem = () => {
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

  const StokSatuan = (props) => {
    const [jumlahBA, setJumlahBA] = useState();
    Axios.get(`${url}/rakterpakai/jumlah/${props.barang.barang_id}`, {
      headers: authHeader(),
    })
      .then((res) => {
        setJumlahBA(res.data);
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
        {jumlahBA < 15 && <td>{props.barang.barang.produk}</td>}
        {jumlahBA < 15 && <td style={{ color: "red" }}>{jumlahBA}</td>}
        {/* <td>{props.barang.barang.produk}</td>
        <td>{jumlahBA}</td> */}
      </Fragment>
    );
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <div className="col-sm table-responsive">
        <h5 className="text-center">Barang yang Sedikit</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nama Barang</th>
              <th scope="col">Stok</th>
            </tr>
          </thead>
          <tbody>
            {barangOneForAll &&
              barangOneForAll.map((OneForAll) => {
                return (
                  <tr key={OneForAll.id}>
                    {/* <td>{OneForAll.barang.produk}</td> */}
                    <StokSatuan barang={OneForAll} />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
