import { STORES_OBTAINED_SUCCESSFULLY, STORE_CREATED_SUCCESSFULLY,
     STORE_UPDATED_SUCCESSFULLY, STOP_LOADING, STORE_DELETED_SUCCESSFULLY } from "../actions/types";

const INITIAL_STATE = {
    stores: [],
    lastId: 0,
    pageNumber: 10,
    resetForm: false,
    
}

export default (state=INITIAL_STATE, actions) => {
    let index = -1;
    let newStore = [];
    switch(actions.type) {
        case STORES_OBTAINED_SUCCESSFULLY:
            return {...state,resetForm: true, stores: actions.payload, lastId: actions.payload[actions.payload.length -1]}
        case STORE_CREATED_SUCCESSFULLY:
            const newStores = state.stores
            newStores.push(actions.payload)
            
            return {...state,resetForm: true, stores: [...newStores], lastId: actions.payload.id}
        case STORE_UPDATED_SUCCESSFULLY:
            index = state.stores.findIndex(store => store.id === actions.payload.id)
            newStore = state.stores;
            if(index !== -1){
                newStore.splice(index, 1)
            }
            newStore.push(actions.payload);
            return {...state,stores: [...newStore], resetForm: true}
        case STORE_DELETED_SUCCESSFULLY:
             index = state.stores.findIndex(store => store.id === actions.payload)
             newStore = state.stores;
            if(index !== -1){
                newStore.splice(index, 1)
            }
            return {...state,stores: [...newStore], resetForm: true}
        case STOP_LOADING:
            return {...state, resetForm: false}
        default:
            return {...state}
    }
}