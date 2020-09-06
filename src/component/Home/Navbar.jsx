import React from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar(props) {
  const logout = () => {
    if (window.confirm("Anda Yakin Ingin Keluar?")) {
      localStorage.removeItem("token");
      // return props.history.push("/login")
      return <Redirect to="/login" />;
    }
  };
  /*===== EXPANDER MENU  =====*/
  // const showMenu = (toggleId, navbarId, bodyId) => {
  //   const toggle = document.getElementById(toggleId),
  //     navbar = document.getElementById(navbarId),
  //     bodypadding = document.getElementById(bodyId);

  //   if (toggle && navbar) {
  //     toggle.addEventListener("click", () => {
  //       navbar.classList.toggle("expander");

  //       bodypadding.classList.toggle("body-pd");
  //     });
  //   }
  // };
  // showMenu("nav-toggle", "navbar", "body-pd");

  // /*===== COLLAPSE MENU  =====*/
  // const linkCollapse = document.getElementsByClassName("collapse__link");
  // var i;

  // for (i = 0; i < linkCollapse.length; i++) {
  //   linkCollapse[i].addEventListener("click", function () {
  //     const collapseMenu = this.nextElementSibling;
  //     collapseMenu.classList.toggle("showCollapse");

  //     const rotate = collapseMenu.previousElementSibling;
  //     rotate.classList.toggle("rotate");
  //   });
  // }

  const [open, setOpen] = useState(false);

  const handleCollapsed = () => {
    if (open) {
      setOpen(false);
      props.lebar(false);
    } else {
      setOpen(true);
      props.lebar(true);
    }
  };

  return (
    <div className="body" id="body-pd">
      <div className={open ? "l-navbar" : "expander"} id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <ion-icon
                name="menu-outline"
                className="nav__toggle"
                id="nav-toggle"
                onClick={() => handleCollapsed()}
                style={{
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  padding: ".75rem",
                }}
              ></ion-icon>
              <Link to="/dashboard" className="nav__logo">
                Warehouse
              </Link>
              {/* <h1 classNameName="nav__logo">Warehouse</h1> */}
            </div>
            <div className="nav__list">
              <NavLink
                to="/dashboard"
                className="nav__link"
                activeClassName="active"
              >
                <ion-icon name="home-outline" className="nav__icon"></ion-icon>
                <span className="nav__name">Dashboard</span>
              </NavLink>
              <NavLink
                to="/isirak"
                className="nav__link"
                activeClassName="active"
              >
                <ion-icon
                  name="file-tray-stacked-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav__name">Isi Rak</span>
              </NavLink>
              <div
                className="nav__link nama-collapse"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <ion-icon
                  name="folder-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav__name">
                  Manipulasi Barang{" "}
                  <ion-icon
                    name="chevron-down-outline"
                    className="collapse__link"
                  ></ion-icon>
                </span>
                {!open && (
                  <ion-icon
                    name="chevron-down-outline"
                    className="collapse__link"
                  ></ion-icon>
                )}
              </div>
              <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                  {/* <h5 className="text-white"><b>Manipulasi Barang</b></h5> */}
                  {/* <span className="text-muted text-center"><b>Manipulasi Barang</b></span> */}
                  <ul className="collapse__menu">
                    <li className="mb-1">
                      <NavLink
                        to="/barang"
                        className="collapse__sublink"
                        activeClassName="active"
                      >
                        <ion-icon name="cube-outline"></ion-icon>{" "}
                        <span className="ml-3"> Barang</span>
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        to="/barangmasuk"
                        className="collapse__sublink"
                        activeClassName="active"
                      >
                        <ion-icon name="enter-outline"></ion-icon>
                        <span className="ml-3"> Barang Masuk</span>
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        to="/barangkeluar"
                        className="collapse__sublink"
                        activeClassName="active"
                      >
                        <ion-icon name="exit-outline"></ion-icon>
                        <span className="ml-3"> Barang Keluar</span>
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        to="/kategori"
                        className="collapse__sublink"
                        activeClassName="active"
                      >
                        <ion-icon name="share-social-outline"></ion-icon>{" "}
                        <span className="ml-3"> Kategori</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/rak"
                        className="collapse__sublink"
                        activeClassName="active"
                      >
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>{" "}
                        <span className="ml-3"> Rak</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <NavLink
                to="/laporan"
                className="nav__link"
                activeClassName="active"
              >
                <ion-icon
                  name="receipt-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav__name">Laporan</span>
              </NavLink>
              <NavLink
                to="/suplier"
                className="nav__link"
                activeClassName="active"
              >
                <ion-icon
                  name="paper-plane-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav__name">Suplier</span>
              </NavLink>
            </div>
            <NavLink to="/role" className="nav__link" activeClassName="active">
              <ion-icon name="people-outline" className="nav__icon"></ion-icon>
              <span className="nav__name">Role</span>
            </NavLink>
            <NavLink
              to="/profile"
              className="nav__link"
              activeClassName="active"
            >
              <ion-icon name="person-outline" className="nav__icon"></ion-icon>
              <span className="nav__name">Profile</span>
            </NavLink>
          </div>
          <Link
            to="/login"
            onClick={logout}
            className="nav__link logout-sidebar"
          >
            <ion-icon name="log-out-outline" className="nav__icon"></ion-icon>
            <span className="nav__name">Log Out</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
