import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL_ORDER } from '../../api/api'
import { Button } from '../retroui/Button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function MyOrder() {
    const navigate = useNavigate()
    const [userOrder, setUserOrder] = useState(null)
    const getUserOrders = async () => {


        const accessToken = localStorage.getItem("accessToken")
        const res = await axios.get(`${API_URL_ORDER}/myorder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.data.success) {
            setUserOrder(res.data.orders)
        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])



    return (
        <div>
            <div className='pr-20 flex flex-col gap-3'>
                <div className='w-full p-6'>
                    <div className='flex item-center gap-4 mb-6'>
                        <Button
                            onClick={() => navigate(-1)}
                        ><ArrowLeft /></Button>
                        <h1 className='text-2xl font-bold'> Orders</h1>

                    </div>
                    {
                        userOrder?.length === 0 ? (
                            <div className='flex items-center justify-center h-64'>
                                <p className='text-gray-500'>No orders found this user</p>
                            </div>
                        )
                            : (
                                <div className='space-y-6'>
                                    {userOrder?.map((order) => (
                                        <div key={order._id} className='border border-gray-200 rounded-lg p-4'>
                                            <div className='text-lg font-semibold'>
                                                <h2 className='text-lg font-bold'> order id :{" "}</h2>
                                                <span className='text-gray-500'>{order._id}</span>
                                                <p> Amount : {order.totalAmount}</p>
                                                <span>{order.currency} {order.amount.toFixed(2)}</span>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )
                    }

                </div>

            </div>


        </div>
    )
}

export default MyOrder