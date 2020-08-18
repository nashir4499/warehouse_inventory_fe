import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import authHeader from '../../services/auth-header'

function Barang() {
    useEffect(() => {
        checkItem()
    }, [])

    const [barangs, setBarangs] = useState([])

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/barang", { headers: authHeader() })
            .then((res) => {
                setBarangs(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://127.0.0.1:3333/barang/${id}`, { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
                .then(res => {
                    window.location.reload();
                }).catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }
                    console.log(err)
                })
        }
    }
    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }

    var nomor = 1
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 card-lain">
                    <h2>Data Barang</h2>
                    <Link className="btn btn-primary" to="/barang/tambah">Tambah Barang</Link>
                </div>
            </div>
            <div className="row card-lain">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="thawal">No</th>
                            <th scope="col">Nama Produk</th>
                            <th scope="col">Suplier</th>
                            <th scope="col">Kategori</th>
                            <th scope="col">Stok</th>
                            <th scope="col">Deskripsi</th>
                            <th scope="col" className="thakhir">opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barangs && barangs.map(barang => {

                            return (
                                <tr key={barang.id}>
                                    <th scope="row">{nomor++}</th>
                                    <td>{barang.produk}</td>
                                    <td>{barang.suplier.id}</td>
                                    <td>{barang.kategori.nama}</td>
                                    <td>{barang.stock}</td>
                                    <td>{barang.deskripsi}</td>
                                    <td>
                                        <Fragment>
                                            <Link to={`/barang/ubah/${barang.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                            <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(barang.id)}>Hapus</button>
                                        </Fragment></td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Barang
