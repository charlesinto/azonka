import { UPDATE_ACCOUNT, UNAUTHORIZED_USER, DISPLAY_ERROR, SUCCESS_ALERT, STOP_LOADING } from "./types";
import axios from "axios";

export const updateUserProfile = userData => {
    const phoneNumber = `${userData.phoneNumber}`
    let data = {}
    if(userData.phoneNumber){
        data = {...userData, phoneNumber:   phoneNumber[0] === '0' ?
         phoneNumber.substr(1, userData.phoneNumber.length - 1) : phoneNumber }
    }else{
        data = userData
    }
    return async (dispatch) => {
        try{
            const response = await axios.put('/api/v1/user/update-my-account', {...data}, {
                                        headers: {
                                            'x-access-token': localStorage.getItem('x-access-token')
                                        }
                                    })
            const user = response.data.user[0]
                localStorage.setItem('azonta-user', JSON.stringify(user))
                 dispatch({type: UPDATE_ACCOUNT, payload: {userData: user, 
                 likes: user.likes ? user.likes: [] , cart: user.cart ? user.cart : [] }})
                 dispatch({
                    type: STOP_LOADING, payload:''
                })
            return dispatch({type: SUCCESS_ALERT, payload: 'Account, updated successfully'})
        }catch(error){
            console.log('eeror', error.response.data)
            if(error.response.status === 401){
                setTimeout(() => {
                    dispatch({type:UNAUTHORIZED_USER, payload: '' })
                },1500)
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            dispatch({
                        type: STOP_LOADING, payload:''
                    })
            return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message})
        }
    }
}

export const updatePassword = (data) =>{
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/user/change-password', {...data}, {
                                        headers: {
                                            'x-access-token': localStorage.getItem('x-access-token')
                                        }
                                    })
                if(response.data.success){
                    dispatch({
                        type: STOP_LOADING, payload: ''
                    })
                    return dispatch({ type: SUCCESS_ALERT, payload: 'Password changed successfully.' })
                }
        }catch(error){
            console.log('eeror', error.response.data)
            if(error.response.status === 401){
                setTimeout(() => {
                    dispatch({type:UNAUTHORIZED_USER, payload: '' })
                },1500)
                dispatch({type: DISPLAY_ERROR,  payload: 'Action unauthourized'})
            }
            dispatch({
                        type: STOP_LOADING, payload:''
                    })
            return dispatch({type: DISPLAY_ERROR,  payload: error.response.data.message})
        }
    }

}

// const updateProfile = data => {
//     console.log('here in update profile')
//     return axios.put('/api/v1/user/update-my-account', {...data}, {
//         headers: {
//             'x-access-token': localStorage.getItem('x-access-token')
//         }
//     })
// }

// const updatePassword = data => {
//     console.log(data.currentPassword, data.newPassword)
//     return axios.post('/api/v1/user/change-password', {...data}, {
//         headers: {
//             'x-access-token': localStorage.getItem('x-access-token')
//         }
//     })
// }