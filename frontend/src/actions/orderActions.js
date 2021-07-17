import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED } from '../constants/orderContstants'

export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ORDER_CREATE_FAILED,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/orders/${id}`, config)
        console.log(data)

        dispatch({  
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAILED,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}