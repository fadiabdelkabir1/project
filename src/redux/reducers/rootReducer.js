import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {editReducer} from "./editReducer";


export const rootReducer=combineReducers({
    auth:authReducer,
    // edit:editReducer,
    client:authReducer
})