import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import authHeader from "../../services/auth-header";
import { Helmet } from "react-helmet";
import image from "./profile.svg";
import { Redirect } from "react-router-dom";
import { url } from "../../services/config";
import { Message } from "@material-ui/icons";

function Profile() {
  const [user, setUser] = useState([]);
  const [foto, setFoto] = useState(false);

  useEffect(() => {
    currentUser();
  }, []);

  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirm_password: "",
  });

  const handleChange = (nama, value) => {
    setData({
      ...data,
      [nama]: value,
    });
  };
  const currentUser = () => {
    Axios.get(`${url}/api/api/profile`, { headers: authHeader() })
      .then((res) => {
        // console.log(res.data)
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
      });
    // Axios.get(`${url}/api/foto`, {
    //   headers: authHeader(),
    //   responseType: 'arraybuffer'
    // })
    //   .then((res) => {
    //     // console.log(res.data)
    //     // (Buffer.from(res.data, 'binary').toString('base64'))
    //     // setFoto(res.data);
    //     setFoto(Buffer.from(res.data, 'binary').toString('base64'));
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 401) {
    //       localStorage.removeItem("token");
    //       window.location.reload();
    //     }
    //     console.log(err);
    //   });
  };

  const changePass = (e) => {
    e.preventDefault();
    if (data.password !== data.newPassword) {
      if (data.newPassword === data.confirm_password) {
        Axios.put(
          `${url}/api/api/changepass`,
          {
            password: data.password,
            newPassword: data.newPassword,
          },
          { headers: authHeader() }
        )
          .then((res) => {
            console.log(res);
            localStorage.removeItem("token");
            return <Redirect to="/login" />;
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.removeItem("token");
              window.location.reload();
            } else if (err.response.status === 400) {
              alert("Password Sekarang Salah");
            }
            console.log(err);
          });
      } else alert("Password Baru dan Confirm Password tidak sama");
    } else {
      alert("Paswword Sekarang dan Password Baru Tidak Boleh Sama");
    }
  };

  const onChangeFoto = (data) => {
    console.log(data.target.files[0]);
    if (data.target.files[0].type === "image/jpeg" || data.target.files[0].type === "image/png") {
      uploadFoto(data)
    } else {
      alert("File harus berupa JPEG atau PNG")
    }
  }

  const uploadFoto = (data) => {
    // console.log(data.target.files[0])
    const user = localStorage.getItem("token");
    const fotoUp = new FormData();
    // fotoUp.append('name', foto);
    fotoUp.append('profile_pic', data.target.files[0]);
    Axios.post(
      `${url}/api/upload`,
      fotoUp,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user,
        },
      }
    )
      .then((res) => {
        // alert("File Upload success");
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

  const FotoUser = (props) => {
    // console.log(props.idnya)
    const id = props.idnya
    // const urlImg = `${url}/api/foto/${user.id}`;
    // const urlImg = `${url}/api/foto/${id}`;
    const urlImg = Axios.get(`${url}/api/foto/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    }).then(response => {
      let imageNode = document.getElementById('fotonya');
      let imgUrl = URL.createObjectURL(response.data)
      imageNode.src = imgUrl
    })
    // Axios.get(`${urlImg}`)
    //   // Axios.get(`${url}/api/foto/${props.idnya}`)
    //   .then((res) => {
    //     // console.log(res.status)
    //     setFoto(true)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   });
    // fetch(urlImg).then(function (response) {
    //   console.log(response.status); // returns 200
    //   if (response.status) {
    //     setFoto(true)
    //   } else {
    //     setFoto(false)
    //   }
    //   // response.blob().then(function(myBlob) {
    //   //   var objectURL = URL.createObjectURL(myBlob);
    //   //   myImage.src = objectURL;
    //   // });
    // });
    return (
      <img
        className="gambar-profil rounded-circle"
        id="fotonya"
        // src={image}
        // src={urlImg}
        // src={foto ? urlImg : image}
        // src={foto === true ? urlImg : image}
        alt="Profile"
      />
    )
  }

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="container isi">
        <div className="row">
          <div className="col-md-3 col-profil-foto text-center">
            <div className="profil-user">
              {user.foto ?
                <FotoUser idnya={user.id} />
                :
                <img
                  className="gambar-profil rounded-circle" src={image} alt="Profile"
                />
              }
              <div className="icon-wrapper">
                {/* <i class="fas fa-upload fa-3x" /> */}
                <ion-icon name="person-outline" className="nav__icon"></ion-icon>
                <input type="file" name="profile_pic" id="profile_pic" onChange={onChangeFoto} />
              </div>
            </div>
          </div>
          <div className="col-md-5 col-profil ml-3">
            <p>Username : {user.username}</p>
            <hr />
            <p>Email : {user.email}</p>
            <hr />
            <button
              className="tampilModalUbah btn btn-warning"
              data-toggle="modal"
              data-target="#formPass"
              data-id={user.id}
            >
              Ganti Password
            </button>
          </div>
        </div>
        <hr />
      </div>

      {/* <!-- Modal Password --> */}
      <div
        className="modal fade"
        id="formPass"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="formPassLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="formPassLabel">
                Ubah Data User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={changePass}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="passlama">Password lama</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Sekarang"
                    value={data.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Baru"
                    value={data.newPassword}
                    onChange={(e) =>
                      handleChange("newPassword", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confrim Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="confirm_password"
                    value={data.confirm_password}
                    onChange={(e) =>
                      handleChange("confirm_password", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Ubah Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
