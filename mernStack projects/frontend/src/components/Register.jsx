import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const naviget = useNavigate()

    const Submit = async () => {

        await axios.post('http://localhost:5000/userRegiter', { name, email, password }).then((res) => {
            if (res.data.code == 200) {
                alert('User Register Now !!!')
                naviget('/')
            }
            else {
                naviget('/register')
            }
        })
    }

    return (
        <div>
            <h1>Register Form</h1>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Enter Name' />
            <br /><br /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email' />
            <br /><br /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password' />
            <br /><br /><br /><button onClick={Submit}>Submit</button>
            <br /><br />
            <Link to={'/'}>Are you Alredy Regiter ? Login</Link>
        </div>

    )
}
