import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_ADDRESS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}    

export const saveAddress = (data) => async(dispatch) => {
    dispatch({
        type: SAVE_ADDRESS,
        payload: data
    })

    localStorage.setItem('ShippingAddress', JSON.stringify(data))
}    