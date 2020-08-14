import React, { useEffect, useState, Fragment } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function IsiRak() {
    useEffect(() => {
        checkItem()
    }, [])

    const [isiRaks, setIsiRaks] = useState([])
    // const [pilihIsi, setPilihIsi] = useState({
    //     id: '',
    //     stock: '',
    //     rak_id: '',
    //     barang_id: '',
    //     rak: [],
    //     barang: []
    // })

    // const [pilihIsi, setPilihIsi] = useState([])

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/rakterpakai")
            .then((res) => {
                setIsiRaks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        Axios.get(`http://192.168.100.173:3333/rakterpakai/${id}`)
            .then(res => {
                // console.log(res.data)
                // setPilihIsi({
                //     id: res.data.id,
                //     stock: res.data.stock,
                //     rak_id: res.data.rak_id,
                //     barang_id: res.data.barang_id,
                //     created_at: res.data.created_at,
                //     updated_at: res.data.updated_at,
                //     rak: res.data.rak,
                //     barang: res.data.barang
                // })
                console.log(res.data.rak.nama)
                if (window.confirm("Hapus Item?")) {
                    // console.log(res.data.rak.stock_max + res.data.stock)
                    Axios.post(`http://192.168.100.173:3333/rak/${res.data.rak_id}`, {
                        id: res.data.rak.id,
                        nama: res.data.rak.nama,
                        stock_max: res.data.rak.stock_max + res.data.stock
                    })
                        .then(response => {
                            console.log(response.data)
                        }).catch(err => {
                            console.log(err)
                        })
                    Axios.delete(`http://192.168.100.173:3333/rakterpakai/${id}`) //pake bactrik kalo mau ngirim parameter
                        .then(response => {
                            window.location.reload();
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            })
        // console.log(pilihIsi.rak.nama)

        // Axios.get(`http://192.168.100.173:3333/rakterpakai/${id}`)
        //     .then(res => {
        //         // console.log(res.data)
        //         setPilihIsi({
        //             id: res.data.id,
        //             stock: res.data.stock,
        //             rak_id: res.data.rak_id,
        //             barang_id: res.data.barang_id,
        //             rak: res.data.rak,
        //             barang: res.data.barang
        //         })
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // console.log(pilihIsi.rak.nama)
        // if (window.confirm("Hapus Item?")) {
        //     // console.log(setPilihIsi)
        //     Axios.post(`http://192.168.100.173:3333/rak/${pilihIsi.rak_id}`, {
        //         id: pilihIsi.rak.id,
        //         nama: pilihIsi.rak.nama,
        //         stock_max: pilihIsi.rak.stock_max + pilihIsi.stock
        //     })
        //         .then(res => {
        //             console.log(res.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     Axios.delete(`http://192.168.100.173:3333/rakterpakai/${id}`) //pake bactrik kalo mau ngirim parameter
        //         .then(res => {
        //             window.location.reload();
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // }

    }

    var nomor = 1
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h2>Barang Masuk</h2>
                    {/* <Link className="btn btn-primary mb-4" to="/barangmasuk/tambah">Tambah Barang Masuk</Link> */}
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rak Nama</th>
                        <th scope="col">Barang Masuk</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {isiRaks && isiRaks.map(isiRak => {

                        return (
                            <tr key={isiRak.id}>
                                <th scope="row">{nomor++}</th>
                                <td>{isiRak.stock}</td>
                                <td>{isiRak.rak.nama}</td>
                                <td>{isiRak.barang.id}</td>
                                <td>{isiRak.updated_at}</td>
                                <td>
                                    <Fragment>
                                        <Link to={`/isirak/ubah/${isiRak.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                        <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleDelete(isiRak.id)}>Hapus</button>
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

export default IsiRak
