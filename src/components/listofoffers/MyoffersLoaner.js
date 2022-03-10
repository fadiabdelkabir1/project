import React, { useEffect } from 'react'
import './myoffer.css'
import { useDispatch, useSelector } from 'react-redux';
import OfferCardLoaner from './OfferCardLoaner'
import { getAlloffers } from '../../redux/actions/poste-action';
function MyoffersLoaner() {
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getAlloffers())
}, []);
const postes = useSelector((state) => state.postinfo.postes);

  console.log(postes)
  return (
    <div className='tocontain'>
      {postes? postes.map((poste)=><OfferCardLoaner key={poste._id}  poste={poste}/>):<></>}
    </div>
    
  )
}


export default MyoffersLoaner