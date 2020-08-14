import React, { useEffect, useState, Fragment } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function BarangMasuk() {

    useEffect(() => {
        checkItem()
    }, [])

    const [bMasuks, setBMasuks] = useState([])

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/bmasuk")
            .then((res) => {
                setBMasuks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://192.168.100.173:3333/bmasuk/${id}`) //pake bactrik kalo mau ngirim parameter
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
                    <h2>Barang Masuk</h2>
                    <Link className="btn btn-primary mb-4" to="/barangmasuk/tambah">Tambah Barang Masuk</Link>
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
                    {bMasuks && bMasuks.map(bMasuk => {

                        return (
                            <tr key={bMasuk.id}>
                                <th scope="row">{nomor++}</th>
                                <td>{bMasuk.barang.produk}</td>
                                <td>{bMasuk.updated_at}</td>
                                <td>{bMasuk.barang.suplier_id}</td>
                                <td>{bMasuk.stock_bm}</td>
                                <td>{bMasuk.deskripsi}</td>
                                <td>
                                    <Fragment>
                                        <Link to={`/barangmasuk/ubah/${bMasuk.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                        <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(bMasuk.id)}>Hapus</button>
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

export default BarangMasuk
