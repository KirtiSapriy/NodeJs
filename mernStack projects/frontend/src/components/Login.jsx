import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const naviget = useNavigate()

    const login = async () => {
        await axios.post('http://localhost:5000/login', { email, password }).then((res) => {
            if (res.data.code == 200) {
                alert(res.data.msg);
                localStorage.setItem('token', res.data.token)
                naviget('/dashboard')

            }
            else if (res.data.code == 203) {
                alert(res.data.msg);
            }
            else {
                alert(res.data.msg)
            }
        })
    }
    return (
        <div><h1>Login</h1>

            <input type="text" onChange={e => setEmail(e.target.value)} placeholder='Enter Email' /><br /><br />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Enter Password' /><br /><br />
            <button onClick={login} >Login</button>
            <br /><br />
            <Link to={'/Register'}>Are you Regiter ? Regiter</Link></div>
    )
}
