import { ADD_PHOTOS, ADD_POSTE,GET_POSTES,DELETE_POSTE,FIND_POSTE, EDIT_POSTE,GET_ALLPOSTES} from "../action-types/poste-action-type"


const initialState={}
export let infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POSTE:
            return {...state,...action.payload }
        case ADD_PHOTOS:
            return {...state,isAuth: true,images:action.payload }
        case GET_POSTES:
            return {...state,isAuth: true,postes:action.payload};    
        case GET_ALLPOSTES:
            return {...state,isAuth: true,postes:action.payload};
        case DELETE_POSTE:
            return {...state,isAuth: true}
        case FIND_POSTE:
            return {...state,viewedposte:action.payload }
        case EDIT_POSTE:
            return {...state,...action.payload }
        default:
            return state;
    }
}