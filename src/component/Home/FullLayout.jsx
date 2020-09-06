import React from "react";
import Navbar from "./Navbar";
import "./style.css";
import NavbarUp from "./NavbarUp";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useState } from "react";

function FullLayout(props) {
  const [lebar, setLebar] = useState();
  const handleLebar = (value) => {
    setLebar(value);
  };
  return (
    <div className="container">
      <Navbar lebar={handleLebar} />
      <div className={lebar ? "content-lebar" : "content"}>
        <NavbarUp />
        {props.children}
      </div>
    </div>
  );
}

export default FullLayout;
