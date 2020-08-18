import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import authHeader from '../../services/auth-header'

function RoleUser(props) {
    useEffect(() => {
        currentUser()
        checkUser()
        checkItem()
        getUser()
        getToken()
    }, [])

    const [user, setUser] = useState([])

    const currentUser = () => {
        Axios.get("http://127.0.0.1:3333/api/api/profile", { headers: authHeader() })
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

    const checkUser = () => {
        if (user.role_user_id !== 1) {
            // return <Redirect to="/dashboard" />
            return props.history.push('/dashboard')
        }
    }

    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [tokens, setTokens] = useState([])
    // const [menuTambahUser, setMenuTambahUser] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    })

    const checkItem = () => {
        Axios.get("http://127.0.0.1:3333/role", { headers: authHeader() })
            .then((res) => {
                setRoles(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }

    const getUser = () => {
        Axios.get("http://127.0.0.1:3333/api/api/alluser", { headers: authHeader() })
            .then((res) => {
                setUsers(res.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
    }
    const getToken = () => {
        Axios.get("http://127.0.0.1:3333/api/api/token", { headers: authHeader() })
            .then((res) => {
                setTokens(res.data)
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

    const signup = (e) => {
        e.preventDefault()
        if (data.confirm_password === data.password) {
            Axios.post('http://127.0.0.1:3333/api/api/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role_user_id: 2
            }, { headers: authHeader() }
            ).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                console.log(err)
            })
        } else (
            alert("Confirm password dan Password tidak sama")
        )
    }

    const logoutSemua = (id) => {
        if (window.confirm("Logout Semua Token?")) {
            Axios.post('http://127.0.0.1:3333/api/api/logoutAll', { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
                .then(res => {
                    localStorage.removeItem('token')
                    props.history.push('/login')
                }).catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }
                    console.log(err)
                })
        }
    }

    const deleteSemua = (id) => {
        if (window.confirm("Anda Yakin Ingin Menghapus Semua Data Token?")) {
            Axios.delete('http://127.0.0.1:3333/api/api/deleteAllToken', { headers: authHeader() }) //pake bactrik kalo mau ngirim parameter
                .then(res => {
                    localStorage.removeItem('token')
                    props.history.push('/login')
                }).catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }
                    console.log(err)
                })
        }
    }

    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }

    var nomor = 1
    var noUser = 1
    var noToken = 1
    return (
        <div className="container mt-4">
            {/* Baris ke 1 */}
            <div className="row ">
                <div className="col-md-4 ">
                    <div className="card-role">
                        <h2>Daftar Role</h2>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-role">
                        <h2>Daftar User</h2>
                    </div>
                </div>
            </div>

            {/* Baris ke 2 */}
            <div className="row">
                <div className="col-md-4 mt-1">
                    <div className="card-role">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="thawal">No</th>
                                    <th scope="col" className="thakhir">Nama</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles && roles.map(role => {

                                    return (
                                        <tr key={role.id}>
                                            <th scope="row">{nomor++}</th>
                                            <td>{role.nama}</td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-8 mt-1">
                    <div className="card-role">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="thawal">No</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" >Role User</th>
                                    <th scope="col" className="thakhir">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user => {

                                    return (
                                        <tr key={user.id}>
                                            <th scope="row">{noUser++}</th>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role.nama}</td>
                                            <td>
                                                {
                                                    user.role.nama !== "Admin" && (
                                                        <button className="btn btn-danger btn-sm" >Hapus</button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* baris ke 3 */}
            <div className="row">
                <div className="col-md-4 pt-3">
                    <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">Tambah User</button>
                </div>
                <div className="col-md-4 pt-3">
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={() => logoutSemua()}>Logout Semua Token</button>
                </div>
                <div className="col-md-4 pt-3">
                    <button type="button" className="btn btn-danger btn-lg btn-block" onClick={() => deleteSemua()}>Hapus Semua Token</button>
                </div>
            </div>

            {/* Baris ke 4 */}
            <div className="row">
                <div className="col-md mt-3">
                    <div className="card-role">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="thawal">No</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Token</th>
                                    <th scope="col">Di Cabut</th>
                                    <th scope="col" className="thakhir">Di Buat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tokens && tokens.map(token => {

                                    return (
                                        <tr key={token.id}>
                                            <th scope="row">{noToken++}</th>
                                            <td>{token.user.username}</td>
                                            <td>{token.token}</td>
                                            <td>{token.is_revoked === 0 ? ("Token Aktif") : ("Token Dicabut")}</td>
                                            <td>{token.created_at}</td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tambah User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={signup}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder="Username" value={data.username} onChange={(e) => handleChange('username', e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={(e) => handleChange('password', e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Confrim Password</label>
                                    <input type="password" className="form-control" placeholder="confirm_password" value={data.confirm_password} onChange={(e) => handleChange('confirm_password', e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Tambah User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RoleUser
