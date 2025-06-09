import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        else {
            getData()
        }


    }, [])

    const getData = async () => {
        let token = localStorage.getItem('token')
        await axios.get('http://localhost:5000/allUser', {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log(res);

        })
    }


    return (
        <div>
            <h1>Dashboard</h1>
            {/* <input type="text" onChange={e => setProduct(e.target.value)} placeholder='Enter product' /> */}
            {/* <input type="text" onChange={e => setPrice(e.target.value)} placeholder='Enter product price' /> */}
            {/* <button>Add Product</button>  */}
        </div>
    )
}
