import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductForm({ setProducts, showForm, setShowForm, editItem, setEditItem }) {
  const [form, setForm] = useState({
    productName: '',
    brand: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {



        const res = await axios.put(`http://localhost:1000/products/updateData?id=${editItem._id}`, form, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setProducts((prev) => prev.map((item) => item.id === editItem.id ? res.data : item));
        setEditItem(null);
        setShowForm(false)
      } else {
        const res = await axios.post('http://localhost:1000/products/addData', form, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setProducts((prev) => [...prev, res.data]);
      }
      setForm({ productName: '', brand: '', price: '', imageUrl: '' });
      setShowForm(false)

    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6 w-full max-w-2xl mx-auto">
      <div className="grid gap-4">
        <input name="productName" value={form.productName} onChange={handleChange} type="text" placeholder="Product / Book Name" className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
        <input name="brand" value={form.brand} onChange={handleChange} type="text" placeholder="Author / Brand" className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} type="url" placeholder="Image URL" className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
        <div className="flex gap-4">
          <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Add Item</button>
          <button type="button" onClick={() => setForm({ productName: '', brand: '', price: '', imageUrl: '' })} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full">Clear</button>
        </div>
      </div>
    </section>
  );
}
