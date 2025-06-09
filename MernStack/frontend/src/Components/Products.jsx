import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteData, GetData, setForm, setId } from '../Slices/JoseSlice'

export default function Products() {

    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(GetData())

    }, [dispacth])
    const data = useSelector((state) => {
        return state.Json
    })


    const Delete = (id) => {
        dispacth(DeleteData(id))
    }

    const edit = (id) => {
        dispacth(setId(id))
        dispacth(setForm(true))
    }


    return (
        <div className='w-11/12 m-auto h-auto grid  gap-4'>
            <table className='border'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Coures</th>
                        <th>City</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.loading == true ? <p>Loading</p> :
                            data.products.length == 0 ? <p>Data not found </p> : data.error != null ? < p > {data.error}</p>
                                :
                                data.products.data.map((el, i) => {
                                    return (
                                        <tr key={i} className=' border'>
                                            <td>{i + 1}</td>
                                            <td>{el.name}</td>
                                            <td>{el.course}</td>
                                            <td>{el.city}</td>
                                            <td>
                                                <button className='capitalize bg-[#009950] border-[#009950] hover:bg-transparent border-2 text-white rounded my-2' onClick={() => { edit(el._id) }}>add</button>
                                            </td>
                                            <td>
                                                <button className='capitalize rounded bg-[#ff000080] border-2 border-[#ff0000] hover:bg-transparent text-white  my-2' onClick={() => Delete(el._id)}>delete</button>
                                            </td>
                                        </tr>)

                                })
                    }
                </tbody>
            </table>


        </div >
    )
}
