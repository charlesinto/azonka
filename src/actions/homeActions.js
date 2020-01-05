import { FETCH_USER, SWITCH_ACTIVE_LINK,TOGGLE_VIEW_TYPE,INITIAL_REGISTRATION,CLOSE_SNACKBAR,
    SUCCESS_ALERT,STOP_IMAGE_LOADING,
     DISPLAY_ERROR, STOP_LOADING, ERROR_FETCHING_ITEMS, ITEMS_FETCHED_SUCCESSFULLY, SET_ACTIVE_LINK
 } from "./types";
import axios from "axios";

import async from "async";

export const fetchUser = () => {
    const user =  JSON.parse(localStorage.getItem('azonta-user'))
    let likes = 0
    let cart = 0
    let userData = null
    let anonynmousUser = null
    //if there is no authenticated user, check if there is userdata stored in localstorage
    //this enables user to carry out operation without registering or logging
    // if(isEmpty(user))
    //     anonynmousUser = localStorage.getItem('anonynmous-azonta-user')
    //if there is an authenticated user get the cart and the likes  
    // if(!isEmpty(user) ){
    //     console.log('here o')
    //     cart = user.cart ? user.cart : 0
    //     likes = user.likes ?  user.likes : 0
    //     userData = user;
    // }
    // if there is no authenticated user, get the user data for anonynmous user from localstorage
    // else{
    //     cart = anonynmousUser.cart
    //     likes = anonynmousUser.cart
    //     userData = anonynmousUser;
    // }
    if(isEmpty(user)){
        anonynmousUser =  JSON.parse(localStorage.getItem('anonynmous-azonta-user'))
        console.log('anony', anonynmousUser)
        cart = anonynmousUser ? anonynmousUser.cart : 0
        likes = anonynmousUser ? anonynmousUser.likes : 0
        userData = anonynmousUser;
    }else{
        cart = user.cart ? user.cart : 0
        likes = user.likes ?  user.likes : 0
        userData = user;
    }

    return {type: FETCH_USER, payload: {userData, likes, cart}}
}

export const switchActiveLink = clickedLink => {
    return {type: SWITCH_ACTIVE_LINK, payload: clickedLink}
}

export const toggleViewType = viewType => {
    return {type: TOGGLE_VIEW_TYPE, payload: viewType}
}

export const initiateRegistration = () => {
    return {type: INITIAL_REGISTRATION, payload: ''}
}

export const closeSnackBar = () => {
    return { type: CLOSE_SNACKBAR, payload: ''}
}

export const renderError = (message = '') => {
    return {type: DISPLAY_ERROR, payload: message}
}

export const showSuccessALert = (message='') => {
    return {type: SUCCESS_ALERT, payload: message}
}

export const stopLoading = () => {
    return {type: STOP_LOADING, payload: ''}
}

export const getProductCategorySubcategory = () => {
    return async (dispatch) => {
        try{
            async.parallel({
                categories: function(callback){
                     axios.get('/api/v1/category/get-categories/0/0')
                            .then(response => {
                                const {data: {categories}} = response;
                                callback(null, categories)
                            })
                            .catch(error => {
                                callback(error, null)
                            }) 
                    
                },
                subCategories:  function(callback) {
                    axios.get('/api/v1/sub-category/get-sub-categories/0/0')
                        .then(response => {
                            const {data: {subCategories}} = response;
                            callback(null, subCategories)
                        })
                        .catch(error => {
                            callback(error, null)
                        })
                    
                }
            }, function(err, results){
                if(err){
                    dispatch({type: ERROR_FETCHING_ITEMS, payload: ''})
                     return dispatch({type: STOP_LOADING, payload:''})
                }
                dispatch({type: STOP_LOADING, payload: ''})
                return dispatch({type: ITEMS_FETCHED_SUCCESSFULLY, payload: results})
            })
        }catch(error){
            
        }
    }
}

export const stopImageLoading = () => {
    return {type: STOP_IMAGE_LOADING, payload: ''}
}

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const setActiveLink = (link = '') => {
    return {type: SET_ACTIVE_LINK, payload:link}
}