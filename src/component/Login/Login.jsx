import React, { useState, useEffect } from 'react'
import user from './user.svg'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
import checkToken from '../../services/user.service';

function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const login = (e) => {
        e.preventDefault()
        authService.login(data.email, data.password)
            .then(() => {
                if (userService.checkToken === true) {
                    return <Redirect to="dashboard" />
                } else {
                    return <Redirect to="login" />
                }
                // props.history.push("/dashboard")
                // window.location.reload();
            }).catch(err => {
                console.log(err)
                // setLoading(false)
            })
        // setLoading(true)
        // Axios.post('http://127.0.0.1:3333/api/api/login', {
        //     email: data.email,
        //     password: data.password
        // }).then(res => {

        //     console.log(res.data)

        //     localStorage.setItem('token', res.data.token)
        //     props.history.push('/dashboard')
        // }).catch(err => {
        //     console.log(err)
        //     // setLoading(false)
        // })
    }

    if (localStorage.getItem('user')) {
        // checkToken().then(res => {
        //     console.log(res.data)
        //     if (res.data === true) {
        //         return <Redirect to="dashboard" />
        //     } else {
        //         return <Redirect to="login" />
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
        return <Redirect to="dashboard" />
    }
    // console.log(userService.checkToken)
    // if (userService.checkToken === true) {
    //     return <Redirect to="dashboard" />
    // } else {
    //     return <Redirect to="login" />
    // }

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    return (
        <div className="container">
            <Helmet> {/* yang nge errorin */}
                <title>Login</title>
            </Helmet>
            <div className="row cardnya">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center login-title">Please Login</h1>
                            <div className="account-wall">
                                <div className="row mb-3">
                                    <div className="col-md-6 offset-md-3 text-center">
                                        <img src={user} alt="" width="70%" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 offset-md-2 text-center">
                                        <form className="form-signin" onSubmit={login} >
                                            <div className="form-group">
                                                <input type="text" name="email" className="form-control" placeholder="Email" required autoFocus value={data.email} onChange={(e) => handleChange('email', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" className="form-control" placeholder="Password" required value={data.password} onChange={(e) => handleChange('password', e.target.value)} />
                                            </div>
                                            <button className="btn btn-lg btn-primary btn-blok" type="submit">Log in</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
