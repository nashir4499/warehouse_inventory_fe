import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function UbahKategori(props) {
    const [data, setData] = useState({
        id: '',
        nama: ''
    })

    useEffect(() => {
        checkItem()
    }, [])

    const checkItem = () => {
        Axios.get(`http://192.168.100.173:3333/kategori/${props.match.params.id}`)
            .then(res => {
                setData({
                    id: res.data.id,
                    nama: res.data.nama
                })
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

    const savePerubahan = (e) => {
        e.preventDefault()
        Axios.post(`http://192.168.100.173:3333/kategori/${props.match.params.id}`, {
            id: data.id,
            nama: data.nama
        }).then(res => {
            props.history.push('/kategori')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="container-fluid mt-3 api">
            <h4>Ubah kategori</h4>
            <Link to="/kategori" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePerubahan}>
                <div className="form-group">
                    <label>Nama kategori</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default UbahKategori
