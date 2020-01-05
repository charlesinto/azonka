
import { UNAUTHORIZED_USER, DISPLAY_ERROR, STOP_LOADING,STORES_OBTAINED_SUCCESSFULLY,
    STORE_CREATED_SUCCESSFULLY, STORE_UPDATED_SUCCESSFULLY, STORE_DELETED_SUCCESSFULLY } from "./types";
import axios from "axios";

export const getStores = (id = 0, pageNumber = 20) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`/api/v1/seller/store/get-stores/${id}/${pageNumber}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({type: STORES_OBTAINED_SUCCESSFULLY, payload: response.data.stores})
            return dispatch({type: STOP_LOADING, payload: ''})
        }catch(error){
            if(error.response.status === 401){
                dispatch({type:UNAUTHORIZED_USER, payload: '' })
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            console.log('error', error.response)
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message.substr(0,100)})
            if(error.response.data)
                return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.substr(0,100)})
            return dispatch({type: DISPLAY_ERROR,  payload: 'some errors were encountered'})
        }
    }
}

export const createStore = (data, id=0, pageNumber=10) => {
    return async (dispatch) => {
        try{
            const response = await axios.post(`/api/v1/seller/store/create`,{...data}, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({type: STORE_CREATED_SUCCESSFULLY, payload: response.data.store})
            return dispatch({type: STOP_LOADING, payload: ''})
        }catch(error){
            if(error.response.status === 401){
                dispatch({type:UNAUTHORIZED_USER, payload: '' })
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            console.log('error', error.response.data.message)
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message.substr(0,100)})
            if(error.response.data)
                return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.substr(0,100)})
            return dispatch({type: DISPLAY_ERROR,  payload: 'some errors were encountered'})
        }
    }
}

export const updateStore = data => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`/api/v1/seller/store/update/${data.id}`,{...data}, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({type: STORE_UPDATED_SUCCESSFULLY, payload: response.data.store[0]})
            return dispatch({type: STOP_LOADING, payload: ''})
        }catch(error){
            if(error.response.status === 401){
                dispatch({type:UNAUTHORIZED_USER, payload: '' })
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            console.log('error', error.response)
            return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message.substr(0,100)})
        }
    }
}

export const deleteStore = (id) => {
    return async (dispatch) => {
        try{
           const response = await axios.delete(`/api/v1/seller/store/delete/${id}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            console.log('response', response)
            dispatch({type: STORE_DELETED_SUCCESSFULLY, payload: id})
            return dispatch({type: STOP_LOADING, payload: ''})
        }catch(error){
            if(error.response.status === 401){
                dispatch({type:UNAUTHORIZED_USER, payload: '' })
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            console.log('error', error.response)
            return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message.substr(0,100)})
        }
    }
}