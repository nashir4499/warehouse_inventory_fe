import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import authHeader from '../../services/auth-header'
import { Helmet } from 'react-helmet'
import image from './profile.svg'

function Profile() {
    const [user, setUser] = useState([])

    useEffect(() => {
        currentUser()
    }, [])

    const currentUser = () => {
        Axios.get("http://127.0.0.1:3333/api/api/profile", { headers: authHeader() })
            .then(res => {
                // console.log(res.data)
                setUser(res.data);
            }).catch(err => {
                console.log(err)
            })
    }

    const changePass = () => {

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
                                    <input type="password" className="form-control" id="passlama" name="passlama" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passbaru">Password baru</label>
                                    <input type="password" className="form-control" id="passbaru" name="passbaru" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passbaru2">Repeat password</label>
                                    <input type="password" className="form-control" id="passbaru2" name="passbaru2" />
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
