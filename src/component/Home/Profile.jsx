import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import authHeader from '../../services/auth-header'
import { Helmet } from 'react-helmet'
import image from './profile.svg'
import { Redirect } from 'react-router-dom'

function Profile() {
    const [user, setUser] = useState([])

    useEffect(() => {
        currentUser()
    }, [])

    const [data, setData] = useState({
        password: '',
        newPassword: '',
        confirm_password: '',
    })

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }
    const currentUser = () => {
        Axios.get("http://192.168.100.173:3333/api/api/profile", { headers: authHeader() })
            .then(res => {
                // console.log(res.data)
                setUser(res.data);
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }

    const changePass = (e) => {
        e.preventDefault()
        if (data.password !== data.newPassword) {

            if (data.newPassword === data.confirm_password) {
                Axios.put('http://192.168.100.173:3333/api/api/changepass', {
                    password: data.password,
                    newPassword: data.newPassword
                }, { headers: authHeader() }
                ).then(res => {
                    console.log(res)
                    localStorage.removeItem('token')
                    return <Redirect to="/login" />
                }).catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem('token')
                        window.location.reload()
                    } else if (err.response.status === 400) {
                        alert("Password Sekarang Salah")
                    }
                    console.log(err)
                })
            } else (
                alert("Password Baru dan Confirm Password tidak sama")
            )
        } else {
            alert("Paswword Sekarang dan Password Baru Tidak Boleh Sama")
        }
    }

    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="container isi">
                <div className="row">
                    <div className="col-md-3 col-profil text-center">
                        <div className="profil-user">
                            <img className="gambar-profil rounded-circle" src={image} alt="" />
                        </div>
                    </div>
                    <div className="col-md-5 col-profil ml-3">
                        <p>
                            Username : {user.username}
                        </p>
                        <hr />
                        <p>
                            Email : {user.email}
                        </p>
                        <hr />
                        <button className="tampilModalUbah btn btn-warning" data-toggle="modal" data-target="#formPass" data-id={user.id} >Ganti Password</button>
                    </div>
                </div>
                <hr />
            </div>

            {/* <!-- Modal Password --> */}
            <div className="modal fade" id="formPass" tabIndex="-1" role="dialog" aria-labelledby="formPassLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formPassLabel">Ubah Data User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={changePass}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="passlama">Password lama</label>
                                    <input type="password" className="form-control" placeholder="Password Sekarang" value={data.password} onChange={(e) => handleChange('password', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password Baru" value={data.newPassword} onChange={(e) => handleChange('newPassword', e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Confrim Password</label>
                                    <input type="password" className="form-control" placeholder="confirm_password" value={data.confirm_password} onChange={(e) => handleChange('confirm_password', e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Ubah Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
