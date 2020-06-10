import { GET_BANKS, GET_SAVED_ACCOUNTS, ACCOUNT_ADDED_SUCCESSFULLY, 
    CLOSE_SNACKBAR, ACCOUNT_UPDATED, USER_WALLET_OBTAINED_SUCCESSFULLY, CREDITS_OBTAINED_SUCCESSFULLY } from "../actions/types";

const INITIATL_STATE = {
    banks: [], savedBanks: [], transactions: [], balance: 0,
    loading: false,verified:null,resetForm: false, error: null,errorMessage: null,
     user: null, questions:{}, successMessage: null, showSuccessBar: null,
     credits: {}
}
export default (state=INITIATL_STATE , actions) => {


    switch(actions.type){
        case GET_BANKS:
            return {...state,resetForm: false, banks: actions.payload}
        case GET_SAVED_ACCOUNTS: 
            return {...state,resetForm: false, savedBanks: actions.payload}
        case ACCOUNT_ADDED_SUCCESSFULLY:
            return {...state,resetForm: true, savedBanks: actions.payload, }
        case CLOSE_SNACKBAR:
                return {...state,resetForm: false, error: null, errorMessage:null, showSuccessBar: null}
        case ACCOUNT_UPDATED:
            return {...state, resetForm: true}
        case USER_WALLET_OBTAINED_SUCCESSFULLY: 
            return {...state, transactions: actions.payload.transactions, balance: actions.payload.balance}
        case CREDITS_OBTAINED_SUCCESSFULLY:
            return {...state, credits: actions.payload}
        default:
            return {...state}
    }
}