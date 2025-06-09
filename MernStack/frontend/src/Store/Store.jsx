import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import JoseSlice from '../Slices/JoseSlice'

export const Store = configureStore({
    reducer: {
        Json: JoseSlice
    }
})