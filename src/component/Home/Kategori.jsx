import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function Kategori() {
    useEffect(() => {
        checkItem()
    }, [])

    const [kategoris, setKategoris] = useState([])

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/kategori")
            .then((res) => {
                setKategoris(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://127.0.0.1:3333/kategori/${id}`) //pake bactrik kalo mau ngirim parameter
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
                    <h2>Daftar Kategori</h2>
                    <Link className="btn btn-primary mb-4" to="/kategori/tambah">Tambah Kategori Baru</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kategoris && kategoris.map(kategori => {

                                return (
                                    <tr key={kategori.id}>
                                        <th scope="row">{nomor++}</th>
                                        <td>{kategori.nama}</td>
                                        <td>
                                            <Fragment>
                                                <Link to={`/kategori/ubah/${kategori.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                                <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(kategori.id)}>Hapus</button>
                                            </Fragment></td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Kategori
