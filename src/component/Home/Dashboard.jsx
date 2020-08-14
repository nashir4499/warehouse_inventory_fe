import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import authHeader from '../../services/auth-header'
import { Redirect, Link } from 'react-router-dom'


function Dashboard(props) {

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/login')
    }

    const [user, setUser] = useState([]);
    // const [barangMasuks, setBarangMasuks] = useState([]);
    const [barangs, setBarangs] = useState([]);
    const [raks, setRaks] = useState([]);
    const [barangMasuk, setBarangMasuk] = useState([]);
    const [barangKeluar, setBarangKeluar] = useState([]);
    const [suplier, setSuplier] = useState([]);
    const [pilihRak, setPilihRak] = useState({
        id: '',
        nama: '',
        stock_max: ''
    });
    const [pilihBarang, setPilihBarang] = useState({
        id: '',
        produk: '',
        suplier_id: '',
        kategori_id: '',
        stock: '',
        deskripsi: '',

    });

    useEffect(() => {
        currentUser()
        checkItem()
    }, [])

    const currentUser = () => {
        Axios.get("http://192.168.100.173:3333/api/api/profile", { headers: authHeader() })
            .then(res => {
                // console.log(res.data)
                setUser(res.data);
            }).catch(err => {
                console.log(err)
            })
    }

    const checkItem = () => {
        Axios.get("http://192.168.100.173:3333/bmasuk/jumlah")
            .then((res) => {
                setBarangMasuk(res.data)
            }).catch(err => {
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/suplier/jumlah")
            .then((res) => {
                setSuplier(res.data)
            }).catch(err => {
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/bkeluar/jumlah")
            .then((res) => {
                setBarangKeluar(res.data)
            }).catch(err => {
                console.log(err)
            })
        // Axios.get("http://192.168.100.173:3333/bmasuk")
        //     .then((res) => {
        //         setBarangMasuks(res.data)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        Axios.get("http://192.168.100.173:3333/barang")
            .then((res) => {
                setBarangs(res.data)
            }).catch(err => {
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/rak")
            .then((res) => {
                setRaks(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const rakTersedia = 64 - barangMasuk;

    const [pasangRak, setPasangRak] = useState([]);
    const [pasangBarang, setPasangBarang] = useState(['']);

    // const handleChangeRak = (e) => {
    //     setPasangRak(e.target.value)
    // }
    // const handleChangeBarang = (e) => {
    //     setPasangBarang(e.target.value)
    // }
    // const [data, setData] = useState({
    //     stok: '',
    //     // kembali: '',
    //     buku_id: '',
    //     anggota_id: ''
    // })
    // if (pasangBarang > "0" && pasangRak > "0") {
    //     // Axios.get(`http://192.168.100.173:3333/rak/${pasangRak}`)
    //     //     .then(res => {
    //     //         console.log(res.data)
    //     //         setPilihRak(res.data)
    //     //     }).catch(err => {
    //     //         console.log(err)
    //     //     })
    //     // Axios.get(`http://192.168.100.173:3333/bmasuk/${pasangBarang}`)
    //     //     .then(res => {
    //     //         console.log(res.data)
    //     //         setPilihBM(res.data)
    //     //     }).catch(err => {
    //     //         console.log(err)
    //     //     })

    //     return
    // }

    const pilihItem = () => {
        Axios.get(`http://192.168.100.173:3333/rak/${pasangRak}`)
            .then(res => {
                console.log(res.data)
                setPilihRak(res.data)
            }).catch(err => {
                console.log(err)
            })
        Axios.get(`http://192.168.100.173:3333/barang/${pasangBarang}`)
            .then(res => {
                console.log(res.data)
                setPilihBarang(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const simpanBarang = (e) => {
        e.preventDefault()
        if (pilihRak.stock_max > 0 && pilihBarang.stock > 0) {
            // const stok = pilihRak.stock_max - pilihBM.stock_bm;
            const currantStockRak = pilihRak.stock_max - pilihBarang.stock;
            console.log(currantStockRak)
            if (currantStockRak < 0) {
                const stockfix = Math.abs(currantStockRak)
                console.log((stockfix))
                Axios.post(`http://192.168.100.173:3333/rak/${pasangRak}`, {
                    id: pilihRak.id,
                    nama: pilihRak.nama,
                    stock_max: 0
                })
                    .then(res => {
                        console.log(res.data)
                        // setPilihRak(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
                Axios.post(`http://192.168.100.173:3333/barang/${pasangBarang}`, {
                    id: pilihBarang.id,
                    produk: pilihBarang.produk,
                    suplier_id: pilihBarang.suplier_id,
                    kategori_id: pilihBarang.kategori_id,
                    stock: stockfix,
                    deskripsi: pilihBarang.deskripsi
                })
                    .then(res => {
                        console.log(res.data)
                        // setPilihBM(res.data)
                    }).catch(err => {
                        console.log(err)
                    })

                Axios.post('http://192.168.100.173:3333/rakterpakai', {
                    stock: pilihBarang.stock - stockfix,
                    rak_id: pasangRak,
                    barang_id: pasangBarang,
                })
                    .then(res => {
                        console.log(res.data)
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                    })

            } else {
                Axios.post(`http://192.168.100.173:3333/rak/${pasangRak}`, {
                    id: pilihRak.id,
                    nama: pilihRak.nama,
                    stock_max: pilihRak.stock_max - pilihBarang.stock
                })
                    .then(res => {
                        console.log(res.data)
                        // setPilihRak(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
                Axios.post(`http://192.168.100.173:3333/barang/${pasangBarang}`, {
                    id: pilihBarang.id,
                    produk: pilihBarang.produk,
                    suplier_id: pilihBarang.suplier_id,
                    kategori_id: pilihBarang.kategori_id,
                    stock: 0,
                    deskripsi: pilihBarang.deskripsi
                })
                    .then(res => {
                        console.log(res.data)
                        // setPilihBM(res.data)
                    }).catch(err => {
                        console.log(err)
                    })

                Axios.post('http://192.168.100.173:3333/rakterpakai', {
                    stock: pilihBarang.stock,
                    rak_id: pasangRak,
                    barang_id: pasangBarang,
                })
                    .then(res => {
                        console.log(res.data)
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        } else {
            alert("Stok Rak Penuh atau Stok Barang Kosong")
        }
    }

    return (
        <div className="container">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="row mb-2">
                Hollo User
                <div>{user.username}</div>
                <div>{user.email}</div>
                <button onClick={logout}>Logout</button>
            </div>

            {/* baris pertama */}
            <div className="row">
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h1>{barangMasuk}</h1>
                            <h6>Barang Masuk</h6>
                            <div className="row text-right mInfo">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h1>{barangKeluar}</h1>
                            <h6>Barang Keluar</h6>
                            <div className="row text-right mInfo">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h1>{rakTersedia}</h1>
                            <h6>Rak Tersedia</h6>
                            <div className="row text-right mInfo">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* baris ke dua */}
            <div className="row">
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h1>{suplier}</h1>
                            <h6>Jumlah Suplier</h6>
                            <div className="row text-right mInfo">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        {/* rakTersedia >= 32 ? 'rgba(255, 176, 176)' : 'rgba(255, 176, 176)' */}
                        <div className="card-body" style={{ background: rakTersedia >= 32 ? 'rgba(255, 176, 176)' : 'rgba(183, 255, 173)', borderRadius: '10px' }}>
                            <h4><b>{rakTersedia >= 32 ? 'Dibawah Standar' : 'Diatas Standa'}</b></h4>
                            <h6>Stok Dalam Rak</h6>
                            <div className="row text-right mInfo mt-4">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mb-3 col-md-4">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            {/* <h1>Go</h1> */}
                            <h3>Laporan</h3>
                            <div className="row text-right mInfo mt-5">
                                <div className="col">
                                    {/* <Link className="card-link">More Info</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* baris ke tiga */}
            <div className="row">
                <div className="col">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <form onSubmit={simpanBarang}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <select className="custom-select mb-3" id="raks" name="raks" onChange={(e) => setPasangRak(e.target.value)}>
                                            <option defaultValue>Choose...</option>
                                            {
                                                raks && raks.map(rak => {
                                                    // const cek = barang.stock - barang.stock.length > 0;
                                                    // return (
                                                    //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stock - barang.stock.length} | </option>
                                                    // )
                                                    return (
                                                        <option key={rak.id} value={rak.id}  >{rak.nama} || {rak.stock_max}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Rak Id" defaultValue={pasangRak} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Stock" defaultValue={pilihRak.stock_max} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <select className="custom-select mb-3" id="barangs" name="barangs" onChange={(e) => setPasangBarang(e.target.value)}>
                                            <option defaultValue>Choose...</option>
                                            {
                                                barangs && barangs.map(barang => {
                                                    // const cek = barang.stock - barang.stock.length > 0;
                                                    // return (
                                                    //     <option key={barang.id} value={cek ? barang.id : 0} style={cek ? { color: "black" } : { color: "red" }}>{barang.prodak} | Stok: {barang.stock - barang.stock.length} | </option>
                                                    // )
                                                    return (
                                                        <option key={barang.id} value={barang.id} >{barang.id}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Serial Barang " defaultValue={pasangBarang} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Stock" defaultValue={pilihBarang.stock} />
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-success float-right" onClick={pilihItem}>Cek</button>
                                <button type="submit" className="btn btn-primary float-right" >Masukan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </div >
    )


}

export default Dashboard
