import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import authHeader from '../../services/auth-header'
import { Helmet } from 'react-helmet'

function BarangKeluar() {
    useEffect(() => {
        checkItem()
    }, [])

    const [bKeluars, setBKeluars] = useState([])

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/bkeluar", { headers: authHeader() })
            .then((res) => {
                setBKeluars(res.data)
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
            Axios.delete(`http://192.168.100.173:3333/bkeluar/${id}`, { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
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
            <Helmet>
                <title>Barang Keluar</title>
            </Helmet>
            <div className="row">
                <div className="col-md-6 card-lain">
                    <h2>Barang Keluar</h2>
                    <Link className="btn btn-primary mb-4" to="/barangkeluar/tambah">Tambah Barang Keluar</Link>
                </div>
            </div>
            <div className="row card-lain">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="thawal">No</th>
                            <th scope="col">Barang</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Suplier</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Deskripsi</th>
                            <th scope="col" className="thakhir">opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bKeluars && bKeluars.map(bKeluar => {

                            return (
                                <tr key={bKeluar.id}>
                                    <th scope="row">{nomor++}</th>
                                    <td>{bKeluar.barang.produk}</td>
                                    <td>{bKeluar.updated_at}</td>
                                    <td>{bKeluar.barang.suplier_id}</td>
                                    <td>{bKeluar.stock_bk}</td>
                                    <td>{bKeluar.deskripsi}</td>
                                    <td>
                                        <Fragment>
                                            <Link to={`/barangkeluar/ubah/${bKeluar.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                            <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(bKeluar.id)}>Hapus</button>
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

export default BarangKeluar
