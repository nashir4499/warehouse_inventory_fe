import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function TambahRak(props) {
    const [data, setData] = useState({
        id: '',
        nama: '',
        stock_max: ''
    })

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    const savePinjam = (e) => {
        e.preventDefault()
        Axios.post('http://192.168.100.173:3333/rak', {
            id: data.id,
            nama: data.nama,
            stock_max: data.stock_max,
        }).then(res => {
            console.log(res)
            props.history.push('/rak')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah Rak</h4>
            <Link to="/rak" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePinjam}>
                <div className="form-group">
                    <label htmlFor="rilis">ID</label>
                    <input type="text" className="form-control" value={data.id} onChange={(e) => handleChange('id', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nama Rak</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Stok Maximal</label>
                    <input type="text" className="form-control" value={data.stock_max} onChange={(e) => handleChange('stock_max', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default TambahRak
