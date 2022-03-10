import React, { useEffect } from 'react'
import './offercard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Carousel,Button } from 'react-bootstrap';
import { getuserHandler } from '../../redux/actions/edit-action';


function OfferCardLoaner({poste}) {
  const dispatch =useDispatch()
  const id = poste._id
  useEffect(() => {
    if (poste.landlord[0]) 
    {dispatch( getuserHandler(poste.landlord[0] ))} 
}, []);
  const user = useSelector((state) => state.edit.landlord);
  const dir=`/images/imagesfor${user.fullname+user._id}/imagesforpost${poste.poste_id}/`
  let images=[]
  for (let i = 0; i in poste.images; i++) {
    images.push({"url":dir+poste.images[i]})
  } 
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
          <Link  to={`/offerpage/${id}`}><Button style={{margin:2}} size="sm" >View Offer</Button></Link> 
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

export default OfferCardLoaner