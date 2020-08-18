import React, { useEffect, useState, Fragment } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import authHeader from '../../services/auth-header'

function Rak() {
    useEffect(() => {
        checkItem()
    }, [])

    const [raks, setRaks] = useState([])

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/rak", { headers: authHeader() })
            .then((res) => {
                setRaks(res.data)
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
            Axios.delete(`http://127.0.0.1:3333/rak/${id}`, { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
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
                    <h2>Daftar Rak</h2>
                    <Link className="btn btn-primary mb-4" to="/rak/tambah">Tambah Rak Baru</Link>
                </div>
            </div>
            <div className="row card-lain">

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="thawal">No</th>
                            <th scope="col">ID</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Stock_MAX</th>
                            <th scope="col" className="thakhir">Opsi</th>
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
        </div>
    )
}

export default Rak
