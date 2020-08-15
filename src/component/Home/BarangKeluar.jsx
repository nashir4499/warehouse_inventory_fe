import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function BarangKeluar() {
    useEffect(() => {
        checkItem()
    }, [])

    const [bKeluars, setBKeluars] = useState([])

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/bkeluar")
            .then((res) => {
                setBKeluars(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://127.0.0.1:3333/bkeluar/${id}`) //pake bactrik kalo mau ngirim parameter
                .then(res => {
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                })
        }

    }

    var nomor = 1
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h2>Barang Keluar</h2>
                    <Link className="btn btn-primary mb-4" to="/barangkeluar/tambah">Tambah Barang Keluar</Link>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Barang</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Suplier</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">opsi</th>
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
    )
}

export default BarangKeluar
