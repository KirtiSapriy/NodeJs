// RegisterForm.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const naviget = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        await axios.post('http://localhost:1000/newUser', formData).then((res) => {
            console.log(res);

            if (res.data.code == 200) {
                alert('User Register Now !!!')
                naviget('/')
            }
            else {
                alert(res.data.msg)
                naviget('/')
            }
        })
    };

    return (
        <div className="space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Register
            </button>
        </div>
    );
}
