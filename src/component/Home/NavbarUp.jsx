import React from 'react'
import warehouse from './warehouse.svg'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import authHeader from '../../services/auth-header'
import image from './profile.svg'

function NavbarUp() {
    const [user, setUser] = useState([])

    useEffect(() => {
        currentUser()
    }, [])

    const logout = () => {
        if (window.confirm("Anda Yakin Ingin Keluar?")) {
            localStorage.removeItem('token')
            // return props.history.push("/login")
            return < Redirect to="/login" />
        }
    }
    const currentUser = () => {
        Axios.get("http://127.0.0.1:3333/api/api/profile", { headers: authHeader() })
            .then(res => {
                // console.log(res.data)
                setUser(res.data);
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }

    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }

    return (
        <nav className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit navbar navbar-expand-xl navbar-light">
            <Link className="text-decoration-none navbar-brand text-left" id="topLogo" to="/">
                <div className="d-flex align-items-center">
                    <img className="mr-2" src={warehouse} alt="Logo" width="40" />
                    <h5 className="text-sans-serif">warehouse</h5>
                </div>
            </Link>
            <ul className="align-items-center d-none d-lg-block navbar-nav mt-2">
                <li className="nav-item">
                    <h6>Hallo <img src={image} alt="" /> {user.username} </h6>
                </li>
            </ul>
            <ul className="navbar-nav-icons ml-auto d-none d-lg-block align-items-center navbar-nav">
                <li className="nav-item">
                    <h6>Email: {user.email} </h6>
                </li>
            </ul>

            <ul className="navbar-nav-icons ml-auto d-none d-lg-block align-items-center navbar-nav ">
                <li className="dropdown nav-item">
                    <h6>Role: {user.role_user_id === 1 ? 'Admin' : 'User'}</h6>
                </li>
            </ul>

            <ul className="navbar-nav-icons ml-auto flex-row align-items-center navbar-nav">
                <li className="dropdown nav-item">
                    <div className="row">
                        <button className="logout" onClick={logout}>Logout</button>
                    </div>
                </li>
            </ul>
        </nav >
    )
}

export default NavbarUp
