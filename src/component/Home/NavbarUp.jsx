import React from "react";
import warehouse from "./warehouse.svg";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import authHeader from "../../services/auth-header";
import image from "./profile.svg";
import { url } from "../../services/config";

function NavbarUp() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    currentUser();
  }, []);

  const logout = () => {
    if (window.confirm("Anda Yakin Ingin Keluar?")) {
      localStorage.removeItem("token");
      // return props.history.push("/login")
      window.location.reload();
      return <Redirect to="/login" />;
    }
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
  };

  const FotoUserAtas = (props) => {
    // console.log(props.idnya)
    const id = props.idnya
    // const urlImg = `${url}/api/foto/${user.id}`;
    // const urlImg = `${url}/api/foto/${id}`;
    const urlImg = Axios.get(`${url}/api/foto/${id}`, {
      headers: authHeader(),
      responseType: 'blob'
    }).then(response => {
      let imageNode = document.getElementById('fotoatas');
      let imgUrl = URL.createObjectURL(response.data)
      imageNode.src = imgUrl
    })

    return (
      <img
        className="gambar-profil rounded-circle"
        id="fotoatas"
        alt="Logo" width="40" style={{ maxHeight: "40px" }}
      />
    )
  }

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }

  return (
    <nav className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit navbar navbar-expand-xl navbar-light">
      <Link
        className="text-decoration-none navbar-brand text-left"
        id="topLogo"
        to="/"
      >
        <div className="d-flex align-items-center">
          <img className="mr-2" src={warehouse} alt="Logo" width="40" />
          <h5 className="text-sans-serif">warehouse</h5>
        </div>
      </Link>
      {/* <ul className="align-items-center d-none d-lg-block navbar-nav mt-2">
        <li className="nav-item">
          <h6>
            Hallo <img src={image} alt="" /> {user.username}{" "}
          </h6>
        </li>
      </ul>
      <ul className="navbar-nav-icons ml-auto d-none d-lg-block align-items-center navbar-nav">
        <li className="nav-item">
          <h6>Email: {user.email} </h6>
        </li>
      </ul>

      <ul className="navbar-nav-icons ml-auto d-none d-lg-block align-items-center navbar-nav ">
        <li className="dropdown nav-item">
          <h6>Role: {user.role_user_id === 1 ? "Admin" : "User"}</h6>
        </li>
      </ul> */}

      <div className="dropdown navbar-nav-icons ml-auto flex-row align-items-center navbar-nav">
        <button className="dropdown-toggle btnNavUp" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="account-user-avatar">
            {user.foto ?
              <FotoUserAtas idnya={user.id} />
              :
              // <img className="gambar-profil rounded-circle" src={image} alt="Profile" />
              <img src={image} alt="" style={{ maxHeight: "40px" }} />
            }
            {/* <img src="assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle"/> */}
          </span>
          <span>
            <span className="account-user-name"><b> Hallo {user.username}</b></span>
          </span>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {/* <!-- item--> */}
          <div className=" dropdown-header noti-title">
            <h6 className="text-overflow m-0 mb-1 nav_name"><ion-icon name="mail-outline"></ion-icon> {user.email} </h6>
          </div>

          {/* <!-- item--> */}
          {user.role_user_id === 1 ?
            <Link to="/role" className="dropdown-item">
              <ion-icon name="people-outline" className="nav__icon"></ion-icon>
              <span className="nav__name"> Admin</span>
            </Link>
            :
            <h6 className="dropdown-item">
              <ion-icon name="people-outline" className="nav__icon"></ion-icon>
              <span className="nav__name"> User</span>
            </h6>
          }

          {/* <!-- item--> */}
          <Link to="/profile" className="dropdown-item">
            <ion-icon name="person-outline" className="nav__icon"></ion-icon>
            <span className="nav__name"> Profile</span>
          </Link>
          {/* <!-- item--> */}
          <Link to="/login" onClick={logout} className="dropdown-item">
            <ion-icon name="log-out-outline" className="nav__icon"></ion-icon>
            <span className="nav__name"> Logout</span>
          </Link>
        </div>
      </div>

      {/* <ul className="navbar-nav-icons ml-auto flex-row align-items-center navbar-nav">
        <li className="dropdown nav-item">
          <div className="row">
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </li>
      </ul> */}
    </nav>
  );
}

export default NavbarUp;
