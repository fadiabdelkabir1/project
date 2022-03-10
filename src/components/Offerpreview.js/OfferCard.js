import React from 'react'
import './offercard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deletePosteHandler } from '../../redux/actions/poste-action';
import { Carousel,Button } from 'react-bootstrap';


function OfferCard({poste}) {
  const user = useSelector((state) => state.auth.user);
  const dir=`/images/imagesfor${user.fullname+user._id}/imagesforpost${poste.poste_id}/`
  let images=[]
  for (let i = 0; i in poste.images; i++) {
    images.push({"url":dir+poste.images[i]})
  } 
  const dispatch =useDispatch()
  const id = poste._id
  const fullname=user.fullname
  const user_id=user._id
  const poste_id=poste.poste_id
  const deletePoste=()=>{
    dispatch(deletePosteHandler(id,fullname,user_id,poste_id))
}
  console.log(poste)
  return (
    <>
      <Card className='Cardbody' > 
      <div className='textcard'>
        <CardContent className='texts'>
          <div>
          <h4 >{poste.title}</h4>
          <h5 >{poste.price}DT</h5>
          <p >{poste.adress}</p>
          </div>
        </CardContent>
        <CardActions>
          <div className='btnss'>
          <Link  to={`/offernumber/${id}`}><Button style={{margin:2}} size="sm" >EDIT</Button></Link> 
          <Button style={{margin:2}} onClick={deletePoste} size="sm">DELETE</Button>
          </div>
        </CardActions>
      </div>       
      <div className='photocard' >
      <Carousel style={{height:"280px",maxWidth:"390px"}}>
        {images.map(img=>(<Carousel.Item>
          <img
            key={poste._id+img.url}
            className="d-block"
            style={{height:"280px",maxWidth:"100%",marginLeft:"auto",marginRight:"auto"}}
            src={img.url}
            alt="slide pic"
          />
        </Carousel.Item>))}
      </Carousel>
      </div>
      </Card>
    </>
  )
}

export default OfferCard