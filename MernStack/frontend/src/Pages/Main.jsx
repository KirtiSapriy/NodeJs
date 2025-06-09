import React, { useState } from 'react'
import Form from '../Components/Form'
import Products from '../Components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { setForm } from '../Slices/JoseSlice'

function Main() {
    const states = useSelector((state) => {
        return state.Json
    })
    const dispatch = useDispatch()
    return (
        <>
            <div className='h-146 w-full '>
                <div className='h-18 py-4  grid gap-4 grid-cols-2 place-items-center'>
                    <button className='border-2 border-pink-600 hover:bg-pink-600  font-semibold h-10 w-40 rounded-lg place-self-end' onClick={() => dispatch(setForm(true))}>Form</button>
                    <button className='border-2 border-pink-600 hover:bg-pink-600  font-semibold h-10 w-40 rounded-lg place-self-start' onClick={() => dispatch(setForm(false))}>Products</button>
                </div>


                <div className=''>

                    {states.isForm == true ? <Form /> : <Products />}
                </div>

            </div >
        </>
    )
}

export default Main