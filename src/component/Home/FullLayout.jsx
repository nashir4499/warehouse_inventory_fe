import React from 'react'
import Navbar from './Navbar'
import './style.css'
import NavbarUp from './NavbarUp'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function FullLayout(props) {

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <NavbarUp />
                {props.children}
            </div>
        </div>
    )
}

export default FullLayout
