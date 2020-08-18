import React from 'react'
import { Redirect } from 'react-router-dom'

function Laporan() {

    if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            LAPORAN
        </div>
    )
}

export default Laporan
