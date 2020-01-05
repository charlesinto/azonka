import { 
    SUCCESSFUL_REGISTRATION, CLEAR_ERROR, 
    SUCCESS_RESENDING_PASSCODE, EMAIL_VERIFICATION_SUCCESFFUL,
    ERROR_RESENDING_PASSCODE, GET_SEC_QUESTIONS, LOGOUT_USER, EMAIL_FORGOT_PASSWORD_SENT,LOGIN_SUCCESS,
    LOGIN_UNSUCCESSFUL, PASSWORD_REST_SUCCESSFUL, STOP_LOADING,FILE_UPLOADED_FALIED, FILE_UPLOADED_SUCCESSFULL,
    USER_ROLE_UPDATED_SUCCESSFUL,RESET_VERIFY_FORM,
    UNSUCCESSFUL_VERIFICATION,SUCCESS_ALERT, UNAUTHORIZED_USER, DISPLAY_ERROR, FETCH_USER,RESET_VERIFICATION_FORM
 } from "./types";
import axios from "axios";
import { fileUpload } from "../components/util/FileUploader";

export const registerUser = (userData) => {
    console.log('data', userData)
    const data = {...userData, phoneNumber: userData.phoneNumber[0] === '0' ? userData.phoneNumber.substr(1,
        userData.phoneNumber.length) : userData.phoneNumber}
    return async (dispatch) => {
        let response;
        try{
            console.log('data', data)
            response = await axios.post('/api/v1/registration/signup',{
                ...data
            })
                console.log(response.data);
                 localStorage.setItem('userRegDetails', JSON.stringify(data))
                //  dispatch({type: SUCCESS_ALERT, payload: 'Registration successful please check your mail to continue'})
                 dispatch({type: SUCCESSFUL_REGISTRATION, payload: ''})
                // return window.location.href = window.origin + '/users/verify'
            
        } catch(error){
            console.log('un able to o', error.response.data)
            if(error.response.data.message){
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0,100) })
            }
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0,100) })
            
        }
        
        
    }
}

export const clearError = () => {
    return { type: CLEAR_ERROR, payload: ''}
}

export const verifyEmail = (userData) => {
    console.log('user-data', userData)
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/registration/verify-email', {
                ...userData
            })
            
            if(response.status === 200 ){
                console.log('response', response.data)
                //localStorage.removeItem('userRegDetails')
                //dispatch({type: SUCCESSFUL_VERIFICATION, payload: response.data})
                const response2 = await axios.get('/api/v1/user/get-user', {
                    headers: {
                        'x-access-token': response.data.token
                    }
                })
                if(Array.isArray(response.data.user)){
                    localStorage.setItem('azonta-user', JSON.stringify({
                        ...response.data.user[0], ...response2.data.user
                    }))
                }else{
                    localStorage.setItem('azonta-user', JSON.stringify({
                        ...response.data.user, ...response2.data.user
                    }))
                }
                
                //axios.defaults.headers.common['x-access-token'] = response.data.token
                localStorage.setItem('x-access-token', response.data.token)
                
                
                localStorage.removeItem('userRegDetails')
                //dispatch({type: SUCCESS_ALERT, payload: 'Account Verified successfully'})
                return dispatch({type: EMAIL_VERIFICATION_SUCCESFFUL, payload: ''})
                //return window.location.href = window.origin + '/users/profile'
           }
        }catch(error) {
            dispatch({type: DISPLAY_ERROR, payload:'Some errors were encountered, please try to login'})
            dispatch({type: UNSUCCESSFUL_VERIFICATION, payload: error.response.data.message})
           // return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message })
            //dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors where encountered'})
            //return window.location.href = window.origin + '/users/login'
        }
    }
}
 
export const resendEmail = emailAddress => {
    console.log(emailAddress)
    return async(dispatch) => {
        try{
            const response = await axios.post('/api/v1/registration/resend-verification-code', {
                emailAddress
            })
            if(response.status === 200){
                console.log('response', response.data)
                dispatch({type: SUCCESS_RESENDING_PASSCODE, payload: ''})
            }
        }catch(error){
            console.log('eror', error.response)
            dispatch({type: ERROR_RESENDING_PASSCODE, payload: error.message})
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message })
        }
    }
}

export const login = user => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/authentication/login', {
                ...user
            })
            if(response.status === 200){
                
                const response2 = await axios.get('/api/v1/user/get-user', {
                                        headers: {
                                            'x-access-token': response.data.token
                                        }
                                    })
                axios.defaults.headers.common['x-access-token'] = response.data.token
                localStorage.setItem('azonta-user', JSON.stringify({
                    ...response.data.user,
                    ...response2.data.user
                }))
                localStorage.setItem('x-access-token',response.data.token) 
                localStorage.removeItem('userRegDetails')
                localStorage.removeItem('passcode')
                return dispatch({type: LOGIN_SUCCESS, payload:''})
            }
        }catch(error){
            if(error.response.data.message.toLowerCase() === 'please verify your email address'){
                localStorage.setItem('userRegDetails', JSON.stringify(user))
                return dispatch({type: LOGIN_UNSUCCESSFUL, payload: '' })
            }
            dispatch({type: UNSUCCESSFUL_VERIFICATION, payload: error.response.data.message.substr(0,100)})
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0,100) })
        }
    }
}

export const getSecurityQuestions = () => {
    return async (dispatch)=> {
        try{
            const response = await axios.get('/api/v1/user/get-security-questions')
            dispatch({type: STOP_LOADING, payload: ''})
            dispatch({type: GET_SEC_QUESTIONS, payload: response.data.questions})
        }catch(error){
            console.log('error', error.response);
            dispatch({type: STOP_LOADING, payload: ''})
            if(error.response.status === 401){
                setTimeout(() => {
                    dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
                }, 2000)
                 
            }
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0,100)})
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0,100)})                
        }
    }
}
export const forgotPassword = emailAddress => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/user/forgot-password', {
                emailAddress
            })
             dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: ''})
             return dispatch({type:SUCCESS_ALERT, payload:response.data.message})
        }catch(error) {
            if(error.response.data.message){
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0,100) })
            }
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0,100) })
            
        }
    }
 }
export const logout = (page= null) => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('userRegDetails')
    //window.location.href = window.origin;
    return {type: LOGOUT_USER, payload: page }
}

export const unauthorized = () => {
    localStorage.removeItem('azonta-user')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('userRegDetails')
    //window.location.href = window.origin;
    return {type: UNAUTHORIZED_USER, payload: '' }
}

export const resetPasswordWithToken = userData => {
    return async (dispatch) =>{
        try{
            const response = await axios.post('/api/v1/user/reset-password', {...userData})
            console.log('respnse', response)
            dispatch({type: EMAIL_FORGOT_PASSWORD_SENT, payload: 'Password update successful, please login'})
            setTimeout(() => {
                //window.location.href = window.origin + '/users/login'
                dispatch({type: PASSWORD_REST_SUCCESSFUL, payload: ''})
            },2000)
            dispatch({type: SUCCESS_ALERT, payload: 'Password reset successful'})
        }catch(error){
            console.log('error response', error.response.data)
            if(error.response.data.message){
               return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0,100)})
            }
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0,100)})
        }
    }
}

export const updateUserType = (userData, type) => {
    return async (dispatch) => {
        try {
            console.log(userData, type)
            const token = localStorage.getItem('x-access-token')
            const response = await axios.put('/api/v1/user/change-account-type', {
                                ...userData,type}, {
                                headers: {
                                    'x-access-token': token
                                }
                            })
            console.log('response', response)
            let newUserData = {}
            const getUserResponse2 = await axios.get('/api/v1/user/get-user', {
                headers: {
                    'x-access-token': token
                }
            })
            console.log('get response', getUserResponse2)
            const user = getUserResponse2.data.user
            const cart = newUserData.cart ? newUserData.cart : 0
            const likes = newUserData.likes ?  newUserData.likes : 0
            dispatch( {type: FETCH_USER, payload: {userData: user, likes, cart}})
            if(type === 'user'){
                    dispatch({type: SUCCESS_ALERT, payload: 'Wallet setup successfully'})
            }else{
                dispatch({type: SUCCESS_ALERT, payload: 'Account upgraded Successfully'})
            }
            dispatch({type: USER_ROLE_UPDATED_SUCCESSFUL, payload: ''})
            
            
        }catch(error){
            console.log(error.response)
            if(error.response.status === 401){
                dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
                return dispatch({type: DISPLAY_ERROR, payload: 'Account deactivated, please contact admininstrator'})
            }
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const fileuploadHandler = (file, foldername='', type = '') => {
    return async (dispatch) => {
        if(!file){
            return ;
        }
        try{
            const data = await fileUpload(file, foldername)
            console.log('data', data)
            return dispatch({type: FILE_UPLOADED_SUCCESSFULL, payload: data.Location})
        }catch(error) {
            dispatch({type: FILE_UPLOADED_FALIED, payload: error })
        }
    }
}

export const setPin = userData => {
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('x-access-token')
            const response = await axios.post('/api/v1/user/set-account-pin', {
                                ...userData}, {
                                headers: {
                                    'x-access-token': token
                                }
                            })
            console.log('response', response)
            let newUserData = {}
            const getUserResponse2 = await axios.get('/api/v1/user/get-user', {
                headers: {
                    'x-access-token': token
                }
            })
            console.log('get response', getUserResponse2)
            const user = getUserResponse2.data.user
            const newUSer = {...user, pinSet: true}
            const cart = newUserData.cart ? newUserData.cart : 0
            const likes = newUserData.likes ?  newUserData.likes : 0
            dispatch( {type: FETCH_USER, payload: {userData: newUSer, likes, cart}})
            dispatch({type: SUCCESS_ALERT, payload: 'Wallet setup successfully'})
            return dispatch({type: USER_ROLE_UPDATED_SUCCESSFUL, payload: ''})
        }catch(error){
            if(error.response.data.message)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const resetVerifyForm = () => {
    return {type: RESET_VERIFY_FORM, payload:''}
}

export const resetVerificationForm = () => {
    return {type: RESET_VERIFICATION_FORM, payload: ''}
}