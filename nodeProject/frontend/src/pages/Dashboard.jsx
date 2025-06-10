import React, { useState } from 'react';
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default function Dashboard() {
    const [showForm, setShowForm] = useState(true);
    const [products, setProducts] = useState([]);
    const [editItem, setEditItem] = useState(null);
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6 md:px-10">
            <Header toggleView={() => setShowForm(!showForm)} showForm={showForm} />
            {showForm ? (
                <ProductForm setProducts={setProducts} editItem={editItem} setEditItem={setEditItem} setShowForm={setShowForm} showForm={showForm} />
            ) : (
                <ProductList products={products} setEditItem={setEditItem} setProducts={setProducts} setShowForm={setShowForm} showForm={showForm} />
            )}
        </div>
    );
}