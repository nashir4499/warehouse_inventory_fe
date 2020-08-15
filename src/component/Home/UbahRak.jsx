import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function UbahRak(props) {
    const [data, setData] = useState({
        id: '',
        nama: '',
        stock_max: ''
    })

    useEffect(() => {
        checkItem()
    }, [])

    const checkItem = () => {
        Axios.get(`http://127.0.0.1:3333/rak/${props.match.params.id}`)
            .then(res => {
                setData({
                    id: res.data.id,
                    nama: res.data.nama,
                    stock_max: res.data.stock_max
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
        Axios.post(`http://127.0.0.1:3333/rak/${props.match.params.id}`, {
            id: data.id,
            nama: data.nama,
            stock_max: data.stock_max
        }).then(res => {
            props.history.push('/rak')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="container-fluid mt-3 api">
            <h4>Ubah Rak</h4>
            <Link to="/rak" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePerubahan}>
                <div className="form-group">
                    <label htmlFor="rilis">ID</label>
                    <input type="text" className="form-control" value={data.id} onChange={(e) => handleChange('id', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nama Rak</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>stock_max</label>
                    <input type="text" className="form-control" value={data.stock_max} onChange={(e) => handleChange('stock_max', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default UbahRak
