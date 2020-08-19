import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import { Helmet } from 'react-helmet';

function UbahBarang(props) {
    const [data, setData] = useState({
        id: '',
        produk: '',
        stock: '',
        deskripsi: '',
        suplier_id: [],
        kategori_id: []
    })
    useEffect(() => {
        checkItem()
    }, [])
    const [kategoris, setKategoris] = useState([]);
    const [supliers, setSupliers] = useState([]);

    const checkItem = () => {
        Axios.get(`http://192.168.100.173:3333/barang/${props.match.params.id}`, { headers: authHeader() })
            .then(res => {
                setData({
                    id: res.data.id,
                    produk: res.data.produk,
                    stock: res.data.stock,
                    deskripsi: res.data.deskripsi,
                    suplier_id: res.data.suplier_id,
                    kategori_id: res.data.kategori_id
                })
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/kategori", { headers: authHeader() })
            .then((res) => {
                setKategoris(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
        Axios.get("http://192.168.100.173:3333/suplier", { headers: authHeader() })
            .then((res) => {
                setSupliers(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    const savePerubahan = (e) => {
        e.preventDefault()

        Axios.post(`http://192.168.100.173:3333/barang/${props.match.params.id}`, {
            id: data.id,
            produk: data.produk,
            stock: data.stock,
            deskripsi: data.deskripsi,
            suplier_id: data.suplier_id,
            kategori_id: data.kategori_id
        }, { headers: authHeader() }
        ).then(res => {
            console.log(res)
            props.history.push('/barang')
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
        <div className="container-fluid mt-3 api">
            <Helmet>
                <title>Ubah Barang</title>
            </Helmet>
            <h4>Ubah Barang </h4>
            <Link to="/barang" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePerubahan}>
                <div className="form-group">
                    <label htmlFor="rilis">ID</label>
                    <input type="text" className="form-control" value={data.id} onChange={(e) => handleChange('id', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nama Produk</label>
                    <input type="text" className="form-control" value={data.produk} onChange={(e) => handleChange('produk', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Stok Barang</label>
                    <input type="text" className="form-control" value={data.stock} onChange={(e) => handleChange('stock', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Deskripsi</label>
                    <input type="text" className="form-control" value={data.deskripsi} onChange={(e) => handleChange('deskripsi', e.target.value)} />
                </div>
                <fieldset id="group1">
                    <div className="form-group">
                        <label>Pilih Kategori</label>
                        <select className="custom-select" id="kategoris" name="kategoris" value={data.kategori_id} onChange={(e) => handleChange('kategori_id', e.target.value)} >
                            <option defaultValue>Choose...</option>
                            {
                                kategoris && kategoris.map(kategori => {
                                    // const cek = barang.stock - barang..length > 0;
                                    return (
                                        <option key={kategori.id} value={kategori.id} >{kategori.nama}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset id="group1">
                    <div className="form-group">
                        <label>Pilih Suplier</label>
                        <select className="custom-select" id="supliers" name="supliers" value={data.suplier_id} onChange={(e) => handleChange('suplier_id', e.target.value)} >
                            <option defaultValue>Choose...</option>
                            {
                                supliers && supliers.map(suplier => {
                                    // const cek = barang.stock - barang..length > 0;
                                    return (
                                        <option key={suplier.id} value={suplier.id} >{suplier.id}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default UbahBarang
