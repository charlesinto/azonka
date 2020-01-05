import { FETCH_USER, SWITCH_ACTIVE_LINK, TOGGLE_VIEW_TYPE, LOGOUT_USER,
     CLOSE_SNACKBAR, UPDATE_ACCOUNT, UNAUTHORIZED_USER,SUCCESS_ALERT,
      DISPLAY_ERROR, INITIAL_REGISTRATION, FILE_UPLOADED_SUCCESSFULL, 
      FILE_UPLOADED_FALIED, ITEMS_FETCHED_SUCCESSFULLY, ERROR_FETCHING_ITEMS, SET_ACTIVE_LINK } from "../actions/types";
const INITIATL_STATE = {currentUser: null, 
    cart: 0, likes: 0, homeActiveLink:'profile',
    categories: [], subCategories: [],
    dashboardActiveLink:'profile',
     viewType: 'grid',error: null, errorMessage:null,fileUrl: null,
     successMessage:null, success: null, showSuccessBar:null, message:'Updated Successfully'}

export default (state=INITIATL_STATE , actions) => {
    
    switch(actions.type){
        case INITIAL_REGISTRATION:
            return {...state, success: null, showSuccessBar: null,error: null, message: null, fileUrl: null}
        case SUCCESS_ALERT: 
            return {...state, success: true, successMessage: actions.payload}
        case CLOSE_SNACKBAR:
            return {...state, success: false, successMessage: null, error: false, errorMessage: null }
        case DISPLAY_ERROR:
            return {...state, error: true, errorMessage: actions.payload}
        case FETCH_USER:
            const {userData, cart, likes} = actions.payload
            if(userData){
                localStorage.setItem('azonta-user', JSON.stringify({...userData}))
            }
            
            return {...state, currentUser: userData, likes, cart}
        case UPDATE_ACCOUNT:
            return {...state, currentUser: actions.payload.userData,
                 likes: actions.payload.likes, cart:actions.payload.cart, showSuccessBar: true }
        case SWITCH_ACTIVE_LINK:
            return {...state, homeActiveLink: actions.payload}
        case TOGGLE_VIEW_TYPE: 
            return {...state, viewType: actions.payload}
        case LOGOUT_USER:
            return {...state,likes:0, cart: 0,
                viewType: 'grid', homeActiveLink:'profile',currentUser: null}
        case UNAUTHORIZED_USER:
                localStorage.removeItem('azonta-user')
                localStorage.removeItem('x-access-token')
                localStorage.removeItem('userRegDetails')
                return {...state,likes:0, cart: 0,
                    viewType: 'grid', homeActiveLink:'profile',currentUser: null}
        case FILE_UPLOADED_SUCCESSFULL:
            return {...state, fileUrl: actions.payload}
        case FILE_UPLOADED_FALIED:
            return {...state, fileUrl: null}
        case ERROR_FETCHING_ITEMS:
            return {...state}
        case ITEMS_FETCHED_SUCCESSFULLY:
            const {subCategories, categories} = actions.payload
            return {...state, subCategories, categories}

        case SET_ACTIVE_LINK:
            return {...state, dashboardActiveLink: actions.payload}
        default:
            return  {...state}
    }
}