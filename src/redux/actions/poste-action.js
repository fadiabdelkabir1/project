import { ADD_POSTE,ADD_PHOTOS,GET_POSTES,FIND_POSTE,DELETE_POSTE,EDIT_POSTE,GET_ALLPOSTES } from "../action-types/poste-action-type"
import { errorHandler } from "./auth-action";
import axios from "axios"


export const addPosteHandler = (postedata) => async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/poste/addposte",
        postedata
      );
      dispatch({
        type: ADD_POSTE,
        payload: res.data,
      });
    } catch (error) {
      dispatch(errorHandler())
      
  
    }
  };

export const addPostePhotosHandler = (images,fullname,id,poste_id) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/poste/posteimages",
      images,{
        headers: {
          'fullname': fullname,
          'id':id,
          'poste_id':poste_id
        }
      }
    );
    dispatch({
      type: ADD_PHOTOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler())
    

  }
};

export const getAllPostes = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/poste/allpostsfor/${id}`
    );
    dispatch({
      type: GET_POSTES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler())
    

  }
};

export const deletePosteHandler = (id,fullname,user_id,poste_id ) => async (dispatch) => {
  try {
      const res = await axios.delete(
      `http://localhost:5000/api/poste/deleteposte/${id}`
      ,{
        headers: {
          'fullname': fullname,
          'userid':user_id,
          'poste_id':poste_id
        }
      } 
      );
      dispatch({
      type: DELETE_POSTE,
      payload:res.data
      });
  } catch (error) {
      dispatch(errorHandler())  
  }
  };


export const getOnePoste = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/poste/findposte/${id}`
    );
    dispatch({
      type: FIND_POSTE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler())
    

  }
};


export const editposteHandler = (id,infoData) => async (dispatch) => {
  try {
      const res = await axios.put(
      `http://localhost:5000/api/poste/editposte/${id}`,
      infoData
    );
    dispatch({
      type: EDIT_POSTE,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler())  
  }
};

export const getAlloffers = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/poste/allpostsfor`
    );
    dispatch({
      type: GET_ALLPOSTES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(errorHandler())
    

  }
};