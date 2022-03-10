import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {editReducer} from "./editReducer";
import {infoReducer} from "./postereducer"


export const rootReducer=combineReducers({
    auth:authReducer,
    edit:editReducer,
    postinfo:infoReducer,
})