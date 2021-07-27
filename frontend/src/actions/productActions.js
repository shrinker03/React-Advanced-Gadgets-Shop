import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL } from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/products')
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/products/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/products/${id}`, config)

        dispatch({  
            type: PRODUCT_DELETE_SUCCESS
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/products`, {}, config)

        dispatch({  
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/products/${product._id}`, product, config)

        dispatch({  
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}