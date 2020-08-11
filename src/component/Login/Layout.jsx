import React from 'react'
import './login.css'

function Layout(props) {
    return (
        <div className="text-center background">
            {props.children}
        </div>
    )
}

export default Layout
