import React, { useEffect, useState } from 'react'
import checkToken from '../../services/user.service'
import Navbar from './Navbar'
import './style.css'
import NavbarUp from './NavbarUp'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
            if (res.data === true) {
                setLoading(false)
            }
        }).catch(err => {
            // console.log(err)
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                props.history.push("/login")
                // setLoading(false)
            }
        })
    }

    if (loading === true) {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col text-center">
                        <Loader />
                    </div>
                </div>
            </div>
        )
    }
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
