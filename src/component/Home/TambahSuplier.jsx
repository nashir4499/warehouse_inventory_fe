import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function TambahSuplier(props) {
    const [data, setData] = useState({
        id: '',
        alamat: '',
        phone: '',
        deskripsi: ''
    })

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    const savePinjam = (e) => {
        e.preventDefault()
        Axios.post('http://127.0.0.1:3333/suplier', {
            id: data.id,
            alamat: data.alamat,
            phone: data.phone,
            deskripsi: data.deskripsi
        }).then(res => {
            console.log(res)
            props.history.push('/suplier')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah Suplier</h4>
            <Link to="/suplier" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePinjam}>
                <div className="form-group">
                    <label htmlFor="rilis">ID</label>
                    <input type="text" className="form-control" value={data.id} onChange={(e) => handleChange('id', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Alamat Suplier</label>
                    <input type="text" className="form-control" value={data.alamat} onChange={(e) => handleChange('alamat', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>No Telpon Suplier</label>
                    <input type="text" className="form-control" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Deskripsi</label>
                    <input type="text" className="form-control" value={data.deskripsi} onChange={(e) => handleChange('deskripsi', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default TambahSuplier
