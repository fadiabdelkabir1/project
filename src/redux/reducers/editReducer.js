// import {
//     EDIT,
//     ERROR
// } from "../action-types/edit-action-types";

// export const editReducer = (state = state, action) => {
//     switch (action.type) {
//         case EDIT:
//             return {...state,user:state.user.map(user=> user.id=== action.payload._id? {...user,email: action.payload.newemail}:user )}
//         case ERROR:
//             return{
//                 ...state,
//                 isAuth:false
//             }
//         default:
//             return state;
//     }
// }



