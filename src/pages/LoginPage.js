import { useState } from "react";
import { navigate } from "gatsby"
import React from "react"

const LoginPage = (props) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        await props.loginUser(loginData)
        setLoginData({
            email: "",
            password: ""
        })
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        await props.logoutUser()
        navigate("/")
    }

    const login = () => {
        return (
                <form className="form-inline" onSubmit={handleLogin}>
                        <input type="email" name="email" placeholder="email" value={loginData.email} onChange={handleChange} />
                        <input type="password" name="password" placeholder="password" value={loginData.password} onChange={handleChange} />
                        <input type="submit" value="Login" />
                </form>
        )
    }
    
    const logout = () => {
        return (
            <form className="form-inline" onSubmit={handleLogout}>
            <input type="submit" value="Logout"/>
            </form>
        )
    }
    
    return (
        <>
        {props.userData ? logout() : login()}
        </>
    )
}

export default LoginPage