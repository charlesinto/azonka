import axios from 'axios'
import { GET_BANKS, ACCOUNT_ADDED_SUCCESSFULLY,
    GET_SAVED_ACCOUNTS, SUCCESS_ALERT, DISPLAY_ERROR, ACCOUNT_UPDATED, STOP_LOADING } from "./types";

export const getBanks = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('https://api.paystack.co/bank' )
            dispatch({type: GET_BANKS, payload: response.data.data})
        }catch(error){
            console.log('error in: => ', error.response)
        }
    }
}

export const saveBank = (details) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/user/bank-account/create', {
                                ...details}, {
                                    headers:{
                                'x-access-token': localStorage.getItem('x-access-token')
                            }})
            if(response.data.success){
                const accounts = await getUserAccount()
                dispatch({type: STOP_LOADING, payload: ''})
                dispatch({type: SUCCESS_ALERT, payload:"Account registered successfully"})
                dispatch({type: ACCOUNT_ADDED_SUCCESSFULLY, payload: accounts})
                
            }
        }catch(error){
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const getSavedBanks = (lastCount = 0, numOfRecords = 10) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`/api/v1/user/bank-account/get/${lastCount}/${numOfRecords}`, {
                                    headers:{
                                        'x-access-token': localStorage.getItem('x-access-token')
                                    }
                                })
            console.log('banksssssss')
            return dispatch({type: GET_SAVED_ACCOUNTS, payload:response.data.bankAccounts})
        }catch(error){
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

const getUserAccount = (lastCount = 0, numOfRecords = 10) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.get(`/api/v1/user/bank-account/get/${lastCount}/${numOfRecords}`, {
                                    headers:{
                                        'x-access-token': localStorage.getItem('x-access-token')
                                    }
                                })
            resolve(response.data.bankAccounts)
        }catch(error){
            reject(error)
        }
    })
    
}

export const modifyAccount = (action = null,data=null, id='') => {
    return async (dispatch) => {
        try{
            console.log(data)
            switch(action){
                case 'update':
                    const response = await axios.put(`/api/v1/user/bank-account/update/${id}`, {...data},{
                                    headers:{
                                'x-access-token': localStorage.getItem('x-access-token')
                            }})
                    console.log('response', response)
                    dispatch({type: STOP_LOADING, payload:''})
                    dispatch({type: SUCCESS_ALERT, payload:"Account updated successfully"})

                     dispatch({type: ACCOUNT_UPDATED, payload: ''})
                     const accounts = await getUserAccount()
                     return dispatch({type: ACCOUNT_ADDED_SUCCESSFULLY, payload: accounts})
                case 'delete':
                    await axios.delete(`/api/v1/user/bank-account/delete/${id}`,{
                            headers:{
                        'x-access-token': localStorage.getItem('x-access-token')
                    }})
                    dispatch({type: STOP_LOADING, payload:''})
                    dispatch({type: SUCCESS_ALERT, payload:"Account deleted successfully"})
                    dispatch({type: ACCOUNT_UPDATED, payload: ''})
                     const account2 = await getUserAccount()
                     return dispatch({type: ACCOUNT_ADDED_SUCCESSFULLY, payload: account2})
                default:
                    return ;
            }
        }catch(error){
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}