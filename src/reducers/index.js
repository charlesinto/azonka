import { combineReducers } from 'redux';
import homeReducer from "./homeReducer";
import registerationReducer from "./registerationReducer";
import bankReducer from "./bankReducer";
import storeReducer from "./storeReducer";
import itemReducer from "./itemReducer";
export default combineReducers({
    home: homeReducer,
    reg: registerationReducer,
    bank: bankReducer,
    store: storeReducer,
    inventory: itemReducer
})