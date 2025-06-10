// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const naviget = useNavigate()


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        await axios.post('http://localhost:1000/login', formData).then((res) => {
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
                className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
            />
            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Login
            </button>
        </div>
    );
} 