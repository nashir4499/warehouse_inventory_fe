import React from 'react'
import { Link } from 'react-router-dom'
import warehouse from './warehouse.svg'

function Navbar() {
    return (
        <nav className="navbar-vertical navbar navbar-light navbar-glass navbar-expand-x1">
            <div className="d-flex align-items-center">
                <button className="navbar-toggler nav-line" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <button type="button" id="toggleNavigationTooltip" class="navbar-toggler-humburger-icon navbar-vertical-toggle btn btn-link"> */}
                    <span className="navbar-toggler-icon"></span>
                </button>

                <p className="navbar-brand text-decoration-none text-left icon-warehouse" to="/">
                    <div className="d-flex align-items-center py-3">
                        <img className="mr-2" src={warehouse} alt="logo" width="40" />
                        <span className="text-sans-serif">warehouse</span>
                    </div>
                </p>
            </div>
            <div className="scrollbar navbar-collapse" id="navbarNav">
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/buku">Daftar Buku</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/pinjam">Daftar Pinjam</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/anggota">Daftar Anggota</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
