import React, { useState } from 'react'
import axios from 'axios'
import {API_URL_ORDER} from '../../api/api'
function MyOrder() {

const [userOrder,setUserOrder] = useState(null)
const getUserOrders = async()=>{


    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${API_URL_ORDER}/myorder`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
    if(res.data.success){
        setUserOrder(res.data.orders)
    }
}

useEffect(() => {
    getUserOrders()
}, [])



  return (
    <div>MyOrder</div>
  )
}

export default MyOrder