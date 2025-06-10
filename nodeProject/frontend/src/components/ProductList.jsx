import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList({ setEditItem, setShowForm }) {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:1000/products/getData', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((res) => setProducts(res.data.data))
            .catch((err) => console.error('Fetch error:', err));
    }, []);

    console.log(products);

    const handleDelete = async (id) => {
        try {


            await axios.delete(`http://localhost:1000/products/deleteData?id=${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then((res) => {


                setProducts(res.data.data)

            })
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <section className="grid gap-4 w-full max-w-2xl mx-auto">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow gap-4"
                >
                    <div className="flex items-start gap-4 w-full">
                        <img
                            src={product.imageUrl}
                            alt="Item"
                            className="w-16 h-16 object-cover rounded-lg border dark:border-gray-700"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{product.productName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{product.price}</p>
                        </div>
                    </div><div>
                        <button
                            onClick={() => { setEditItem(product); setShowForm(true); }}
                            className="text-sm text-green-500 hover:underline"
                        >
                            Edit
                        </button>
                        &nbsp;&nbsp;
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}
