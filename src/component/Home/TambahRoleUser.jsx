import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function TambahRoleUser(props) {
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
        Axios.post('http://192.168.100.173:3333/role', {
            id: data.id,
            nama: data.nama,
        }).then(res => {
            console.log(res)
            props.history.push('/role')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid mt-3 api">
            <h4>Tambah role</h4>
            <Link to="/role" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePinjam}>
                <div className="form-group">
                    <label>Nama Role</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default TambahRoleUser
