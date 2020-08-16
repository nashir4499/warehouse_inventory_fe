import React, { useEffect, useState, Fragment, useMemo } from 'react'
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
        Axios.get("http://127.0.0.1:3333/rakterpakai")
            .then((res) => {
                setIsiRaks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleKeluar = (id) => {
        Axios.get(`http://127.0.0.1:3333/rakterpakai/${id}`)
            .then(res => {
                console.log(res.data.rak.nama)
                if (window.confirm("Keluarkan Barang?")) {
                    // console.log(res.data.rak.stock_max + res.data.stock)
                    Axios.post('http://127.0.0.1:3333/bkeluar', {
                        stock_bk: res.data.stock,
                        deskripsi: "Barang Keluar",
                        barang_id: res.data.barang_id,
                    }).then(response => {
                        console.log(response)
                    }).catch(err => {
                        console.log(err)
                    })
                    Axios.post(`http://127.0.0.1:3333/rak/${res.data.rak_id}`, {
                        id: res.data.rak.id,
                        nama: res.data.rak.nama,
                        stock_max: res.data.rak.stock_max + res.data.stock
                    })
                        .then(response => {
                            console.log(response.data)
                        }).catch(err => {
                            console.log(err)
                        })
                    Axios.delete(`http://127.0.0.1:3333/rakterpakai/${id}`) //pake bactrik kalo mau ngirim parameter
                        .then(response => {
                            window.location.reload();
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            })

    }

    //search
    const [search, setInput] = useState('');

    //sorting
    const useSortableData = (itmeRaks, config = null) => {
        const [sortConfig, setSortConfig] = useState(config);

        const sortIRaks = useMemo(() => {
            let sortItmeRaks = [...itmeRaks]
            if (sortConfig !== null) {
                sortItmeRaks.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === "ascending" ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === "ascending" ? 1 : -1;
                    }
                    return 0;
                });
            }
            return sortItmeRaks;
        }, [itmeRaks, sortConfig]);

        const requestSort = (key) => {
            let direction = "ascending";
            if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
                direction = "descending";
            }
            setSortConfig({ key, direction });
        };

        return { itmeRaks: sortIRaks, requestSort, sortConfig };
    }

    const { itmeRaks, requestSort, sortConfig } = useSortableData(isiRaks)

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    var nomor = 1
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md">
                    <h2>Data barang yang ada di rak</h2>
                    {/* <Link className="btn btn-primary mb-4" to="/barangmasuk/tambah">Tambah Barang Masuk</Link> */}
                </div>
            </div>
            <div className="row pt-2 pb-2">
                <div className="col-md-6">
                    <input className="form-control" type="text" value={search} onChange={e => setInput(e.target.value)} placeholder="Cari Nama Rak atau Produk" />
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col" onClick={() => requestSort("stock")} className={getClassNamesFor("stock")}>Stock</th>
                        <th scope="col" onClick={() => requestSort("rak_id")} className={getClassNamesFor("rak_id")}>Rak Nama</th>
                        <th scope="col" onClick={() => requestSort("barang_id")} className={getClassNamesFor("barang_id")}>Barang Masuk</th>
                        {/* <th scope="col">Rak Nama</th> */}
                        {/* <th scope="col">Barang Masuk</th> */}
                        <th scope="col" onClick={() => requestSort("updated_at")} className={getClassNamesFor("updated_at")}>Tanggal</th>
                        <th scope="col">opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // isiRaks && isiRaks.map(isiRak => {

                        //     return (
                        //         <tr key={isiRak.id}>
                        //             <th scope="row">{nomor++}</th>
                        //             <td>{isiRak.stock}</td>
                        //             <td>{isiRak.rak.nama}</td>
                        //             <td>{isiRak.barang.produk}</td>
                        //             <td>{isiRak.updated_at}</td>
                        //             <td>
                        //                 <Fragment>
                        //                     <Link to={`/isirak/ubah/${isiRak.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                        //                     <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleKeluar(isiRak.id)}>barang Keluar</button>
                        //                 </Fragment></td>
                        //         </tr>
                        //     )
                        // })

                        // coba RAK
                        // isiRaks.filter(isiRak => {
                        itmeRaks.filter(isiRak => {
                            // if (!search) return true;
                            // // if (isiRak.rak.nama.toLowerCase().includes(search) || isiRak.barang.produk.toLowerCase().includes(search)) {
                            if (isiRak.rak.nama.toLowerCase().includes(search) || isiRak.barang.produk.toLowerCase().includes(search)) {
                                return true;
                            }
                            return false;
                        })
                            .map(isiRak => {

                                return (
                                    <tr key={isiRak.id}>
                                        <th scope="row">{nomor++}</th>
                                        <td>{isiRak.stock}</td>
                                        <td value={isiRak.rak_id}>{isiRak.rak.nama}</td>
                                        <td value={isiRak.barang_id}>{isiRak.barang.produk}</td>
                                        <td>{isiRak.updated_at}</td>
                                        <td>
                                            <Fragment>
                                                <Link to={`/isirak/ubah/${isiRak.id}`}><button className="btn btn-success btn-sm">Ubah</button></Link>
                                                <button className="btn btn-danger ml-1 btn-sm" onClick={() => handleKeluar(isiRak.id)}>barang Keluar</button>
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
