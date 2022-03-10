import axios from "axios";
import { EDIT,ERROR,DELETE,GET_USER } from "../action-types/edit-action-types";

export const errorHandler=()=>async (dispatch)=>{
 
    dispatch({
      type:ERROR
    })
  
  };

export const editHandler = (id,user) => async (dispatch) => {
    try {
        const res = await axios.put(
        `http://localhost:5000/api/user/edit/${id}`,
        user
      );
      dispatch({
        type: EDIT,
        payload: res.data,
      });
    } catch (error) {
      dispatch(errorHandler())  
    }
  };

export const getuserHandler = (id) => async (dispatch) => {
    try {
        const res = await axios.get(
        `http://localhost:5000/api/user/getuser${id}`
      );
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch(errorHandler())  
    }
  };

export const deleteHandler = (id) => async (dispatch) => {
try {
    await axios.delete(
    `http://localhost:5000/api/user/delete/${id}`
    );
    dispatch({
    type: DELETE,
    payload:id
    });
} catch (error) {
    dispatch(errorHandler())  
}
};