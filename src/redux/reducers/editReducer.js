import {
    EDIT,
    ERROR,
    DELETE,
    GET_USER
} from "../action-types/edit-action-types";

const initialState={user:{},landlord:{}}
export const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT:
            return {...state,user:action.payload }
        case DELETE:
            return {...state,user: action.payload }
        case GET_USER:
            return {...state,landlord:action.payload }
        case ERROR:
            return{
                ...state,
                isAuth:false
            }
        default:
            return state;
    }
}



