import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import userService from '../../services/user.service'
import checkToken from '../../services/user.service'
import Navbar from './Navbar'
import './style.css'
import NavbarUp from './NavbarUp'

function FullLayout(props) {

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        checkUser();
    }, [])

    // if (!localStorage.getItem('user')) {
    //     return <Redirect to="login" />
    // }
    const checkUser = () => {
        setLoading(true)
        checkToken().then((res) => {
            console.log(res.data)
            if (res.data === true) {
                props.history.push("/dashboard")

                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                props.history.push("/login")
                setLoading(false)
            }
        })
    }

    return (
        <div className="container">

            {/* {loading ?
                <tr>
                    <td td colSpan="3" > Loading....</td>
                </tr >
                :
                // props.children
            } */}

            <Navbar />
            <div className="content">
                <NavbarUp />
                {props.children}
            </div>
        </div>
    )
}

export default FullLayout
