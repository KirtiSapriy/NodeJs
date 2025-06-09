import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'

const ApiLink = 'http://localhost:5000'

export const AddData = createAsyncThunk("AddData", async (addData) => {
    const res = await axios.post(`${ApiLink}/addData`, addData)
    return res.data.msg
})
export const GetData = createAsyncThunk("GetData", async () => {
    let res = await axios.get(`${ApiLink}/getData`)
    return res.data

})
export const DeleteData = createAsyncThunk("DeleteData", async (id) => {
    await axios.delete(`${ApiLink}/deleteData?id=${id}`)
    return { id, msg: res.data.msg }

})
export const EditData = createAsyncThunk("EditData", async (data) => {
    console.log(data.id);
    await axios.put(`${ApiLink}/updateData?id=${data.id}`, data)
    return { data, msg: res.data.msg }
})

export const JoseSlice = createSlice({
    name: "JoseSlice",
    initialState: { isForm: true, loading: true, products: [], error: null, id: null, msg: '' },
    reducers: {
        setForm: (state, action) => {
            state.isForm = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(GetData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(GetData.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(AddData.fulfilled, (state, action) => {
            state.msg = action.payload
        })
        builder.addCase(DeleteData.fulfilled, (state, action) => {
            let data = state.products.data.filter((el, i) => el._id != id)
            state.products.data = data
            state.msg = action.payload
        })
        builder.addCase(EditData.fulfilled, (state, action) => {
            state.products.data.forEach((el, i) => {
                if (el._id == action.payload.id) {
                    state.products.data[i] = action.payload
                }
            }); ((el, i) => el._id != id)

            state.msg = action.payload
        })
    })
})

export const { setForm, setId } = JoseSlice.actions
export default JoseSlice.reducer