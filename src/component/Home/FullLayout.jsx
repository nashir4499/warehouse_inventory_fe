import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import userService from '../../services/user.service'
import checkToken from '../../services/user.service'
import Navbar from './Navbar'
import './style.css'
import NavbarUp from './NavbarUp'

function FullLayout(props) {

    // useEffect(() => {
    //     checkUser();
    // }, [])

    // const authHeader = () => {

    //     const user = JSON.parse(localStorage.getItem('user'));

    //     if (user && user.token) {
    //         return { Authorization: 'Bearer ' + user.token };
    //     } else {
    //         return {};
    //     }
    // }

    if (!localStorage.getItem('user')) {
        // checkToken().then(res => {
        //     console.log(res.data)
        //     if (res.data) {
        //         return <Redirect to="dashboard" />
        //     } else {
        //         return <Redirect to="login" />
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
        return <Redirect to="login" />
    }
    // const checkUser = () => {
    //     if (!localStorage.getItem('user')) {
    //         if (userService.checkToken === true) {
    //             return <Redirect to="login" />
    //         }
    //     }
    // }

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <NavbarUp />
                {props.children}
            </div>
        </div>
    )
}

export default FullLayout
