import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header'
import checkToken from '../../services/user.service'

function Dashboard(props) {

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/login')
    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        currentUser()
        // checkUser()
    }, [])

    // const checkUser = () => {
    //     // console.log(checkUser)
    //     checkToken().then(res => {
    //         console.log(res.data)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const currentUser = () => {
        Axios.get("http://127.0.0.1:3333/api/api/profile", { headers: authHeader() })
            .then(res => {
                // console.log(res.data)
                setUser(res.data);
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            Hollo User
            <div>{user.username}</div>
            <div>{user.email}</div>
            <button onClick={logout}>Logout</button>
        </div>
    )


}

export default Dashboard
