import {
  LOGIN,
  SINGUP,
  LOUGOUT,
  GET_AUTH_USER,
  ERROR,
} from "../action-types/auth-action-types";

const initialState = {
  user: null,
  isAuth: false,
  token: localStorage.getItem("token"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SINGUP:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,
        ...action.payload, //every property in the res object will be a global state in redux
      };
    case LOUGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case GET_AUTH_USER:
      return {   
        ...state,
        isAuth:true,
        ...action.payload
      };
      case ERROR:
        return{
          ...state,
          isAuth:false
        }
    default:
      return state;
  }
};
