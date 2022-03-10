import React, { useEffect } from 'react'
import './css/myoffer.css'
import { useDispatch, useSelector } from 'react-redux';
import OfferCard from '../components/Offerpreview.js/OfferCard'
import { getAllPostes } from '../redux/actions/poste-action';
function Myoffers() {
  const user = useSelector((state) => state.auth.user);

  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getAllPostes(user._id))
}, []);
const postes = useSelector((state) => state.postinfo.postes);

console.log(postes)
  
  return (
    <div className='tocontain'>
      {postes? postes.map((poste)=><OfferCard key={poste._id}  poste={poste}/>):<></>}
    </div>
    
  )
}


export default Myoffers