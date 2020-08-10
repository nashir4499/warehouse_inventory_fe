import React from 'react'
import './login.css'

function Layout(props) {
    return (
        <div className="text-center">
            {props.children}
        </div>
    )
}

export default Layout
