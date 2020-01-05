import { SUCCESSFUL_REGISTRATION,INITIAL_REGISTRATION, 
    UNSUCCESSFUL_REGISTRATION, CLEAR_ERROR, SUCCESSFUL_VERIFICATION,
ERROR_RESENDING_PASSCODE, SUCCESS_RESENDING_PASSCODE, GET_SEC_QUESTIONS,
 LOGOUT_USER, CLOSE_SNACKBAR, EMAIL_FORGOT_PASSWORD_SENT, GET_SAVED_ACCOUNTS,STOP_IMAGE_LOADING,
 LOGIN_UNSUCCESSFUL, LOGIN_SUCCESS, PASSWORD_REST_SUCCESSFUL, USER_ROLE_UPDATED_SUCCESSFUL,
 UNAUTHORIZED_USER, EMAIL_VERIFICATION_SUCCESFFUL, UNSUCCESSFUL_VERIFICATION,RESET_VERIFY_FORM,
  DISPLAY_ERROR, STOP_LOADING, FILE_UPLOADED_FALIED, FILE_UPLOADED_SUCCESSFULL, RESET_VERIFICATION_FORM } from "../actions/types";
const INITIAL_STATE = {loading: false,verified:null, error: null,errorMessage: null,
     user: null, questions:{}, successMessage: null, showSuccessBar: null, 
    redirectToProfile: false,unAuthorized: false, redirectToVerify: false,verification:'none', redirectToHome: false, redirectToLogin: false}

export default (state=INITIAL_STATE, actions) => {
    switch(actions.type){
        case UNAUTHORIZED_USER:
            console.log('called', actions.type)
            localStorage.removeItem('azonta-user')
            localStorage.removeItem('x-access-token')
            localStorage.removeItem('userRegDetails')
            return {...state,redirectToLogin: true, redirectToVerify:false, unAuthorized: true}
        case RESET_VERIFICATION_FORM:
            return {...state, verification:'none'}
        case INITIAL_REGISTRATION:
                return {...state,redirectToVerify:null, redirectToLogin: null,
                    redirectToHome: false, loading:true,redirectToProfile: null, error: null}
        case FILE_UPLOADED_FALIED:
            return {...state, loading: false, error: true, errorMessage: 'File uploading failed'}
        case FILE_UPLOADED_SUCCESSFULL:
            return {...state, error: false, errorMessage: null}
        case SUCCESSFUL_REGISTRATION:
            return {...state, loading:false,redirectToVerify:true, error: null, errorMessage: null}
        case STOP_LOADING:
            return {...state, loading:false}
        case STOP_IMAGE_LOADING:
            return {...state, loading: false}
        case UNSUCCESSFUL_REGISTRATION:
            return {...state,redirectToLogin: true, loading: false,error:true, errorMessage: actions.payload}
        case DISPLAY_ERROR:
            return {...state, loading:false}
        case SUCCESSFUL_VERIFICATION:
        
            return {...state,redirectToVerify: true, loading: false,verfied: true, error: null, user: actions.payload}
        case CLEAR_ERROR:
            return {...state, error: null}
        case SUCCESS_RESENDING_PASSCODE: 
            return {...state, error: null, errorMessage: actions.payload}
        case ERROR_RESENDING_PASSCODE:
            return {...state, error: true, errorMessage: actions.payload}
        case GET_SEC_QUESTIONS:
            return {...state, questions: actions.payload, error: null, errorMessage: null}
        case LOGOUT_USER:
            return {...state, user: null,unAuthorized:true, redirectToHome: false, redirectToLogin: false, redirectToProfile:false,
            redirectToVerify: false}
        case CLOSE_SNACKBAR:
            return {...state, error: null, errorMessage:null, showSuccessBar: null}
        case EMAIL_FORGOT_PASSWORD_SENT: 
            return {...state,loading: false, showSuccessBar: false, successMessage:actions.payload}
        case GET_SAVED_ACCOUNTS:
            return {...state, showSuccessBar: true, successMessage:'Account added successfully'}
        case LOGIN_SUCCESS:
            return {...state,loading: false, unAuthorized: false, redirectToProfile: true, redirectToVerify: false}
        case LOGIN_UNSUCCESSFUL:
            return {...state,unAuthorized: false,loading: false, error: null,
                 redirectToProfile: false, redirectToVerify: true, redirectToLogin: false}
        case PASSWORD_REST_SUCCESSFUL:
            return {...state, redirectToLogin: true}
        case USER_ROLE_UPDATED_SUCCESSFUL:
            return {...state,loading: false, redirectToProfile:true}
        case EMAIL_VERIFICATION_SUCCESFFUL:
            return {...state,loading: false,unAuthorized:false,redirectToVerify:false,error:null,verification:'true', redirectToProfile: false}
        case UNSUCCESSFUL_VERIFICATION:
            return {...state, loading: false,error:true,verification:'false', errorMessage: actions.payload}
        default: 
            return {...state}
    }
}