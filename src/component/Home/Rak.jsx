import React, { useEffect, useState, Fragment } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function Rak() {
    useEffect(() => {
        checkItem()
    }, [])

    const [raks, setRaks] = useState([])

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/rak")
            .then((res) => {
                setRaks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Hapus Item?")) {
            Axios.delete(`http://192.168.100.173:3333/rak/${id}`) //pake bactrik kalo mau ngirim parameter
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
                    <h2>Daftar Rak</h2>
                    <Link className="btn btn-primary mb-4" to="/rak/tambah">Tambah Rak Baru</Link>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Stock_MAX</th>
                        <th scope="col">Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {raks && raks.map(rak => {

                        return (
                            <tr key={rak.id}>
                                <th scope="row">{nomor++}</th>
                                <td>{rak.id}</td>
                                <td>{rak.nama}</td>
                                <td>{rak.stock_max}</td>
                                <td>
                                    <Fragment>
                                        <Link to={`/rak/ubah/${rak.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                        <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(rak.id)}>Hapus</button>
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

export default Rak
