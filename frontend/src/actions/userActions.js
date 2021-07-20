import axios from "axios"
import { ORDER_LIST_MY_RESET } from "../constants/orderContstants"
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_UPDATE_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: ORDER_LIST_MY_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
}

export const register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/users', {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const updateUserDetails = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/users/profile`, user,  config)

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}

export const deleteUser = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/users/${id}`, config)

        dispatch({type: USER_DELETE_SUCCESS})

    }catch(error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message 
                : error.response
        })
    }
}
