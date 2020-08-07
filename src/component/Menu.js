import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import Home from './Home/Home';

function Menu(props) {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default Menu
