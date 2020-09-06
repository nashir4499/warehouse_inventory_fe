import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import authHeader from '../../services/auth-header'

function UbahRoleUser(props) {
    const [data, setData] = useState({
        id: '',
        nama: ''
    })

    useEffect(() => {
        checkItem()
    }, [])

    const checkItem = () => {
        Axios.get(`http://127.0.0.1:3333/role/${props.match.params.id}`, { headers: authHeader() })
            .then(res => {
                setData({
                    id: res.data.id,
                    nama: res.data.nama
                })
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
        Axios.post(`http://127.0.0.1:3333/role/${props.match.params.id}`, {
            id: data.id,
            nama: data.nama
        }, { headers: authHeader() }
        ).then(res => {
            props.history.push('/role')
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
            <h4>Ubah Role</h4>
            <Link to="/role" className="btn btn-warning mb-3">Kembali</Link>
            <br />

            <form onSubmit={savePerubahan}>
                <div className="form-group">
                    <label>Nama Role</label>
                    <input type="text" className="form-control" value={data.nama} onChange={(e) => handleChange('nama', e.target.value)} />
                </div>
                <button className="btn btn-success" type="submit" >Simpan</button>
            </form>
        </div>
    )
}

export default UbahRoleUser
