import React, { useState } from 'react'
import './login.css'
import user from './user.svg'
import Axios from 'axios'
import { useAuth } from '../../context/auth'

function Login(props) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    // const { setAuthTokens } = useAuth();
    const { setAuthTokens } = useAuth();

    // const [loading, setLoading] = useState(false)

    const login = (e) => {
        e.preventDefault()
        // setLoading(true)
        Axios.post('http://127.0.0.1:3333/api/api/login', {
            email: data.email,
            password: data.password
        }).then(res => {

            console.log(res.data)
            setAuthTokens(res.data);
            props.history.push('../Menu')
        }).catch(err => {
            console.log(err)
            // setLoading(false)
        })
    }

    const handleChange = (nama, value) => {
        setData({
            ...data,
            [nama]: value
        })
    }

    return (
        <div className="container">
            <div className="row cardnya">
                <a href="../Home/Home" >assad</a>
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
