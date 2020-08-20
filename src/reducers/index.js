import { combineReducers } from 'redux';
import homeReducer from "./homeReducer";
import registerationReducer from "./registerationReducer";
import bankReducer from "./bankReducer";
import storeReducer from "./storeReducer";
import itemReducer from "./itemReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    home: homeReducer,
    reg: registerationReducer,
    bank: bankReducer,
    store: storeReducer,
    inventory: itemReducer,
    search: searchReducer
})