// import axios from "axios";
// import { EDIT,ERROR } from "../action-types/edit-action-types";

// export const errorHandler=()=>async (dispatch)=>{
 
//     dispatch({
//       type:ERROR
//     })
  
//   };

// export const editHandler = (user) => async (dispatch) => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/user/edit/:id",
//         user
//       );
//       dispatch({
//         type: EDIT,
//         payload: res.data,
//       });
//     } catch (error) {
//       dispatch(errorHandler())
//       console.dir(error)
  
//     }
//   };