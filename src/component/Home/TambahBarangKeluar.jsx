import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function TambahBarangKeluar(props) {
    const [data, setData] = useState({
        stock_bk: '',
        deskripsi: '',
        barang_id: ''
    })
    useEffect(() => {
        checkItem()
    }, [])
    const [barangs, setBarangs] = useState([]);

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/barang")
            .then((res) => {
                setBarangs(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    const simpanData = (e) => {
        e.preventDefault()
        if (data.barang_id !== "0") {
            Axios.post('http://127.0.0.1:3333/bkeluar', {
                stock_bk: data.stock_bk,
                deskripsi: data.deskripsi,
                barang_id: data.barang_id,
            }).then(res => {
                console.log(res)
                props.history.push('/barangkeluar')
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert("Stok Kosong")
        }
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah Barang Keluar</h4>
            <Link to="/barangkeluar" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={simpanData}>
                <div className="form-group">
                    <label>Stock Barang Keluar</label>
                    <input type="text" className="form-control" value={data.stock_bk} onChange={(e) => handleChange('stock_bk', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Deskripsi</label>
                    <input type="text" className="form-control" value={data.deskripsi} onChange={(e) => handleChange('deskripsi', e.target.value)} />
                </div>
                <fieldset id="group1">
                    <div className="form-group">
                        <label>Pilih Barang</label>
                        <select className="custom-select" id="barangs" name="barangs" onChange={(e) => handleChange('barang_id', e.target.value)} >
                            <option defaultValue>Choose...</option>
                            {
                                barangs && barangs.map(barang => {
                                    // const cek = barang.stock - barang.pinjam.length > 0;
                                    return (
                                        <option key={barang.id} value={barang.id} >{barang.produk}</option>
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

export default TambahBarangKeluar
