import React, { useEffect, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import authHeader from '../../services/auth-header'
import { Helmet } from 'react-helmet'

function Laporan() {

    useEffect(() => {
        checkItem()
    }, [])

    const [bMasuks, setBMasuks] = useState([])
    const [bKeluars, setBKeluars] = useState([])
    const [barangMasuk, setBarangMasuk] = useState([]);
    const [barangKeluar, setBarangKeluar] = useState([]);

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/bmasuk", { headers: authHeader() })
            .then((res) => {
                setBMasuks(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
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
        Axios.get("http://192.168.100.173:3333/bmasuk/jumlah", { headers: authHeader() })
            .then((res) => {
                setBarangMasuk(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/bkeluar/jumlah", { headers: authHeader() })
            .then((res) => {
                setBarangKeluar(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }
    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }
    return (
        <div className="laporan container">
            <Helmet>
                <title>Laporan</title>
            </Helmet>
            <h4 className="text-center pt-3">Laporan Keluar Masuk Barang</h4>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Barang</th>
                        <th scope="col">Nama Barang</th>
                        <th scope="col">Tanggal Masuk</th>
                        <th scope="col">Stok Masuk</th>
                        <th scope="col">Tanggal Keluar</th>
                        <th scope="col">Stok Keluar</th>
                        <th scope="col">Sisa Stok</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        bMasuks && bMasuks.map(bMasuk => {
                            return (

                                <tr key={bMasuk.id}>
                                    <th scope="row" >{bMasuk.barang_id}</th>
                                    <td>{bMasuk.barang.produk}</td>
                                    <td>{bMasuk.updated_at}</td>
                                    <td>{bMasuk.stock_bm}</td>
                                    {
                                        bKeluars.map(bkeluar => {
                                            const stokTersisa = bMasuk.stock_bm - bkeluar.stock_bk;
                                            return (
                                                bMasuk.barang_id === bkeluar.barang_id ?
                                                    <Fragment key={bkeluar.id}>
                                                        <td>{bkeluar.updated_at}</td>
                                                        <td>{bkeluar.stock_bk}</td>
                                                        <td>{stokTersisa}</td>
                                                    </Fragment>
                                                    : <Fragment key="-">
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>{bMasuk.stock_bm}</td>
                                                    </Fragment>
                                            )
                                        })
                                    }
                                </tr>

                            )
                        })
                    }
                    <tr>
                        <th scope="col" colSpan="3" className="text-center">Jumlah</th>
                        <th scope="col">{barangMasuk}</th>
                        <td ></td>
                        <th scope="col">{barangKeluar}</th>
                        <th scope="col">-</th>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Laporan
