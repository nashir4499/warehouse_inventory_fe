import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function TambahKategori(props) {
    const [data, setData] = useState({
        id: '',
        nama: '',
    })

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    const savePinjam = (e) => {
        e.preventDefault()
        Axios.post('http://127.0.0.1:3333/kategori', {
            id: data.id,
            nama: data.nama,
        }).then(res => {
            console.log(res)
            props.history.push('/kategori')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah Kategori</h4>
            <Link to="/kategori" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePinjam}>
                <div className="form-group">
                    <label>Nama Kategori</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default TambahKategori
