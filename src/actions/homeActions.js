import { FETCH_USER, SWITCH_ACTIVE_LINK,TOGGLE_VIEW_TYPE,INITIAL_REGISTRATION,CLOSE_SNACKBAR,
    SUCCESS_ALERT,STOP_IMAGE_LOADING,
     DISPLAY_ERROR, STOP_LOADING, ERROR_FETCHING_ITEMS, ITEMS_FETCHED_SUCCESSFULLY, SET_ACTIVE_LINK,
     ADVERT_CATEGORIES_FETCHED
 } from "./types";
import axios from "axios";
import swal from 'sweetalert2';
import async from "async";
import { disputeFileUploader } from "../components/util/FileUploader";

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


export const getAdvertCategory = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`/api/v1/ad-category/get-ad-categories/0/100`)
            const {adCategories} = response.data
            dispatch({type: ADVERT_CATEGORIES_FETCHED, payload: adCategories})
        }catch(error){
            if(error){
                dispatch({type: ERROR_FETCHING_ITEMS, payload: ''})
                 return dispatch({type: STOP_LOADING, payload:''})
            }
            dispatch({type: STOP_LOADING, payload: ''})
        }
    }
}

export const completeOrder = ({orderId, deliveryCode}) => {
    return async (dispatch) => {
        try{
            const response = await axios.post(`/api/v1/seller/delivery/update/${orderId}`, {
                deliveryCode
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({type: STOP_LOADING, payload: ''})
            swal.fire('Transaction successfully completed')
            console.log(response.data);

            // dispatch({type: SUCCESS_ALERT, payload: ''})
        }catch(error){
            console.log(error.response)
            dispatch({type: STOP_LOADING, payload: ''})
            if(error.response && error.response.data.message){
                return swal.fire(error.response.data.message)
            }else{
                return dispatch({type: DISPLAY_ERROR, payload: 'Could not fulfill request, please try again later'})
            }
            
        }
    }
}

export const createDispute = (delivery = [], message = '',files, damaged = false, different = false) => {
    return async (dispatch) => {
        try{
            delivery.forEach(async (item) => {
                // const mainImageResponse = await fileUpload(data.files[data.mainImageIndex].file, 'storeItems')
                // const mainImageUrl = mainImageResponse.Location;
                let img1 = '', img2 = '', img3 = '', img4 = '', img5= '';
               
                uploadImages(files).then(images => {
                    console.log('images: ', images)
                    img1 = images[0] ? images[0] : '';
                    img2 = images[1] ? images[1] : '';
                    img3 = images[2] ? images[2] : '';
                    img4 = images[3] ? images[3] : '';
                    img5 = images[4] ? images[4] : '';
                    const token = localStorage.getItem('x-access-token');
                axios.post('/api/v1/user/dispute/create', {
                        delivery: `${item.id}`,
                        damaged: damaged,
                        seller: `${item.seller}`,
                        different: different,
                        message: message,
                        img1, img2, img3, img4, img5
                    }, {headers: {'x-access-token': token}})
                    .then((response ) => {
                        dispatch({type: STOP_LOADING, payload: ''})
                        swal.fire('Action Successful', 'Dispute logged successfully, we will be in touch with you', 'success')
                    })
                    .catch((error) => {
                        console.log(error.response)
                        dispatch({type: STOP_LOADING, payload: ''})
                        return swal.fire(error.response.data.message)
                    })
                }).catch((error) => {
                    console.log(error.response)
                        dispatch({type: STOP_LOADING, payload: ''})
                        return swal.fire(error.response.data.message)
                })
                
                // swal.fire('Action Successful', 'Dispute logged successfully, we will be in touch with you', 'success')
                // return dispatch({type: STOP_LOADING, payload: '' })
            })
        }catch(error){
            dispatch({type: STOP_LOADING, payload: ''})
            console.log("called here: ", error.response.data)
            
            if(error.response && error.response.data.message){
                return swal.fire(error.response.data.message)
            }else{
                return dispatch({type: DISPLAY_ERROR, payload: 'Could not fulfill request, please try again later'})
            }
        }
    }

}

const uploadImages = (files) => {
    return new Promise(async (resolve, reject) => {
        try{
            let images = [];
            for(let i = 0; i < files.length; i++){
                console.log('file: ', files[i])
                let fileResponse = await disputeFileUploader(files[i], 'disputes');
                if(images.length < files.length){
                    i = images.length;
                }
                images.push(fileResponse.Location);
            }
            resolve(images)
        }catch(error){
            reject(error)
        }
    })
}

export const rejectDispute = (id, message = '',files) => {
    return async (dispatch) => {
        try{
            let img1 = '', img2 = '', img3 = '', img4 = '', img5= '';
               
                uploadImages(files).then(images => {
                    img1 = images[0] ? images[0] : '';
                    img2 = images[1] ? images[1] : '';
                    img3 = images[2] ? images[2] : '';
                    img4 = images[3] ? images[3] : '';
                    img5 = images[4] ? images[4] : '';
                    const token = localStorage.getItem('x-access-token');
                    axios.put('/api/v1/seller/dispute/reject/' + id, {
                            
                            message: message,
                            simg1: img1, simg2: img2, simg3: img3, simg4:img4, simg5: img5
                        }, {headers: {'x-access-token': token}})
                        .then((response ) => {
                            dispatch({type: STOP_LOADING, payload: ''})
                            swal.fire('Action Successful', 'Operation Successful, we will be in touch with you', 'success')
                        })
                        .catch((error) => {
                            console.log(error.response)
                            dispatch({type: STOP_LOADING, payload: ''})
                            if(error.response){
                             return swal.fire(error.response.data.message)
                            }
                            return swal.fire('Some errors were encountered')
                        })
                    }).catch((error) => {
                            dispatch({type: STOP_LOADING, payload: ''})
                            console.log(error)
                            if(error.response){
                              return swal.fire(error.response.data.message)
                            }
                            return swal.fire('Could not fulfill request, please try again')
                })
        }catch(error){
            dispatch({type: STOP_LOADING, payload: ''})
            console.log("called here: ", error.response.data)
            
            if(error.response && error.response.data.message){
                return swal.fire(error.response.data.message)
            }else{
                return dispatch({type: DISPLAY_ERROR, payload: 'Could not fulfill request, please try again later'})
            }
        }
    }

}