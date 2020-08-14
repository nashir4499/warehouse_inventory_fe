import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function Suplier() {
    useEffect(() => {
        checkItem()
    }, [])

    const [supliers, setSupliers] = useState([])

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/suplier")
            .then((res) => {
                setSupliers(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://192.168.100.173:3333/suplier/${id}`) //pake bactrik kalo mau ngirim parameter
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
                    <h2>Daftar Suplier</h2>
                    <Link className="btn btn-primary mb-4" to="/suplier/tambah">Tambah Suplier Baru</Link>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {supliers && supliers.map(suplier => {

                        return (
                            <tr key={suplier.id}>
                                <th scope="row">{nomor++}</th>
                                <td>{suplier.id}</td>
                                <td>{suplier.alamat}</td>
                                <td>{suplier.phone}</td>
                                <td>{suplier.deskripsi}</td>
                                <td>
                                    <Fragment>
                                        <Link to={`/suplier/ubah/${suplier.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                        <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(suplier.id)}>Hapus</button>
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

export default Suplier
