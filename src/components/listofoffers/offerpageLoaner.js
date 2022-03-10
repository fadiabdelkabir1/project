import React,{ useEffect,useState }  from 'react'
import { useParams } from "react-router-dom";
import {Form,Row,Col,Carousel,Button,Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { editposteHandler, getAllPostes, getOnePoste } from '../../redux/actions/poste-action';
import HouseType from '../toeditbytype/HouseType';
import AppType from '../toeditbytype/AppType';
import CommType from '../toeditbytype/CommType';
import axios from 'axios'
import './offerpage.css'
import { useHistory } from "react-router-dom";
import { getuserHandler } from '../../redux/actions/edit-action';


  function OfferpageLoaner () {
    const [viewedposte,setViewedposte]=useState()
    const [Loading,setLoading]=useState(false)
    const dispatch =useDispatch()
    const id=useParams().id
    const [editable, setEditable] = useState(false)
    //main proprety states
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [adress, setAdress] = useState()
    const [city, setCity] = useState()
    const [stateadr, setStateadr] = useState()
    const [zipp, setZipp] = useState()
    const [proptype, setProptype] = useState()
    //----------------------
    //house states
    const [stories, setStories] = useState()
    const [houserooms, setHouserooms] = useState()
    const [housekitchens, setHousekitchens] = useState()
    const [housebathrooms, setHousebathrooms] = useState()
    const [gardenarea, setGardenarea] = useState()
    const [housebalconies, setHousebalconies] = useState()
    //----------------------
    //comm states
    const [BackOffice, setBackOffice] = useState()
    const [Commfloor, setCommfloor] = useState()
    const [Backdoor, setBackdoor] = useState()
    const [Displaywindow, setDisplaywindow] = useState()
    const [Commelevator, setCommelevator] = useState()
    const [Commentries, setCommentries] = useState()
    //----------------------
    //app states
    const [floor, setFloor] = useState()
    const [rooms, setRooms] = useState()
    const [kitchens, setKitchens] = useState()
    const [bathrooms, setBathrooms] = useState()
    const [elevator, setElevator] = useState()
    const [balconies, setBalconies] = useState() 

  const getpost=async()=>{
    try{
    const data= await axios.get(`http://localhost:5000/api/poste/findposte/${id}`)
    .then(res=>{
      setViewedposte(res.data)
      dispatch(getuserHandler(res.data.landlord))
    })
      setLoading(true)
    } catch(err) {console.log("front")}
  }
  const postedata=useSelector((state)=>state.postinfo.postes)
    useEffect(() => {
      getpost()
    }, [postedata]);
  const user = useSelector((state) => state.edit.landlord);
  console.log(user)
  const poste_id=(viewedposte&& viewedposte.poste_id)
  const savednames=(viewedposte&& viewedposte.images)
  const dir=`/images/imagesfor${user.fullname+user._id}/imagesforpost${poste_id}/`
  let images=[]
  function fillimages(savednames,dir,images)
  {for (let i = 0; i in savednames; i++) {
    images.push({"url":dir+savednames[i]})
  }
} 
 viewedposte? fillimages(savednames,dir,images):getpost()
 


  

let history = useHistory();
return (
    
      <div className='bodycontent'>
        {Loading? 
      (<div className='primaryinfo'>
      <Form>
            <Row className="mb-3" >
              <div className="firstdiv"  >
              <Carousel style={{height:"450px",maxWidth:"100%"}}>
                {images.map(img=>(<Carousel.Item>
                  <img
                    key={poste_id+img.url}
                    style={{height:"450px",margin:'auto'}}
                    className="d-block"
                    src={img.url}
                    alt="slide pic"
                  />
                </Carousel.Item>))}
              </Carousel>
              <Button variant="primary" style={{height:"35px",width:"100%"}} onClick={()=>{history.goBack()}}>Back</Button>:
              </div>
            </Row>
            <hr />
            <Row  >
                <Form.Group  as={Col} >
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Poste Title</Form.Label>
                {editable? <Form.Control onChange={(e)=>setTitle(e.target.value)} 
                value={title} type="text"  />:<p>{viewedposte&& viewedposte.title}</p>}
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}}>Monthely Rate</Form.Label>
                {editable? <Form.Control onChange={(e)=>setPrice(e.target.value)} 
                value={price} type="number"  />:<p>{viewedposte&& viewedposte.price}DT</p>}
                </Form.Group>
            </Row>
            <hr />

            <Form.Group className="mb-3" controlId="formGridAddress1" >
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Address of the proprety</Form.Label>
                {editable? <Form.Control onChange={(e)=>setAdress(e.target.value)} 
                value={adress} type="text"  />:<p>{viewedposte&& viewedposte.adress}</p>}
            </Form.Group>
            <hr />

            <Row className="mb-3" style={{maxWidth:"80%"}}>
            <Form.Group  as={Col} controlId="formGridState">
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >State</Form.Label>
                {editable? (<Form.Select onChange={(e)=>setStateadr(e.target.value)} >
                <option>{viewedposte&& viewedposte.state}</option>
                {statesList.map(state=><option  key={state} >{state}</option>)}
                </Form.Select>):<p>{viewedposte&& viewedposte.state}</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >City</Form.Label>
                {editable? (<Form.Select onChange={(e)=>setCity(e.target.value)} >
                <option>{viewedposte&& viewedposte.city}</option>
                {countriesList.map(city=><option  key={city} >{city}</option>)}
                </Form.Select>):<p>{viewedposte&& viewedposte.city}</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Zip</Form.Label>
                {editable? <Form.Control onChange={(e)=>setZipp(e.target.value)} 
                value={zipp} type="number"  />:<p>{viewedposte&& viewedposte.zip}</p>}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label style={{fontSize:"20px",color:"#5c5d61"}} >Proprety Type</Form.Label>
                {editable? (<Form.Select  onChange={(e)=>setProptype(e.target.value)}>
                  {(viewedposte&& viewedposte.type==="House")? 
                  (toshowifhouse.map(type=><option key={type+1} >{type}</option>)):
                  (viewedposte&& viewedposte.type==="Appartement")? 
                  (toshowifapp.map(type=><option key={type+2} >{type}</option>)):
                  (toshowifcomm.map(type=><option key={type+3} >{type}</option>))}
                </Form.Select>):<p>{viewedposte&& viewedposte.type}</p>}
                </Form.Group>

                
            </Row>
            <hr />
                  <div >
                  {!editable? ((viewedposte&& viewedposte.type==="House")?
                  (<HouseType  morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setStories={setStories} stories={stories} setHouserooms={setHouserooms} houserooms={houserooms} setHousekitchens={setHousekitchens} housekitchens={housekitchens} setHousebathrooms={setHousebathrooms} housebathrooms={housebathrooms} setGardenarea={setGardenarea} gardenarea={gardenarea} setHousebalconies={setHousebalconies}   housebalconies={housebalconies}/>):
                  (viewedposte&& viewedposte.type==="Appartement")?
                  (<AppType morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setFloor={setFloor} floor={floor} setRooms={setRooms} rooms={rooms} setKitchens={setKitchens} kitchens={kitchens} setBathrooms={setBathrooms} bathrooms={bathrooms} setElevator={setElevator} elevator={elevator} setBalconies={setBalconies} balconies={balconies}/>):
                  (viewedposte&& viewedposte.type==="Commercial Store")? 
                  (<CommType morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setBackOffice={setBackOffice} BackOffice={BackOffice} setCommfloor={setCommfloor} Commfloor={Commfloor} setBackdoor={setBackdoor} Backdoor={Backdoor} setDisplaywindow={setDisplaywindow} Displaywindow={Displaywindow} setCommelevator={setCommelevator} Commelevator={Commelevator} setCommentries={setCommentries} Commentries={Commentries}/>):<></>):
                  ((proptype==="House")?
                  (<HouseType  morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setStories={setStories} stories={stories} setHouserooms={setHouserooms} houserooms={houserooms} setHousekitchens={setHousekitchens} housekitchens={housekitchens} setHousebathrooms={setHousebathrooms} housebathrooms={housebathrooms} setGardenarea={setGardenarea} gardenarea={gardenarea} setHousebalconies={setHousebalconies}   housebalconies={housebalconies}/>):
                  (proptype==="Appartement")?
                  (<AppType morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setFloor={setFloor} floor={floor} setRooms={setRooms} rooms={rooms} setKitchens={setKitchens} kitchens={kitchens} setBathrooms={setBathrooms} bathrooms={bathrooms} setElevator={setElevator} elevator={elevator} setBalconies={setBalconies} balconies={balconies}/>):
                  (proptype==="Commercial Store")?
                  (<CommType morefut={viewedposte&& viewedposte.moreFeatures} editable={editable}  setBackOffice={setBackOffice} BackOffice={BackOffice} setCommfloor={setCommfloor} Commfloor={Commfloor} setBackdoor={setBackdoor} Backdoor={Backdoor} setDisplaywindow={setDisplaywindow} Displaywindow={Displaywindow} setCommelevator={setCommelevator} Commelevator={Commelevator} setCommentries={setCommentries} Commentries={Commentries}/>):<></>)}

                  </div>
        </Form>
        </div>
      ):(<Spinner animation="border"  />)
    }
      </div>
  )
}

export default OfferpageLoaner

const toshowifhouse=['House','Appartement','Commercial Store']
const toshowifapp=['Appartement','House','Commercial Store']
const toshowifcomm=['Commercial Store','House','Appartement']


const statesList=["Tunis", "Ariana", "Ben Arous", "Mannouba", "Bizerte", "Nabeul", "Béja", "Jendouba", "Zaghouan", 
"Siliana", "Le Kef", "Sousse", "Monastir", "Mahdia", "Kasserine", "Sidi Bouzid", "Kairouan", "Gafsa", "Sfax", "Gabès", "Médenine",
 "Tozeur", "Kebili", "Tataouine"]
 const countriesList=['Tunis',
 'Le Bardo',
 'Le Kram',
 'La Goulette',
 'Carthage',
 'Sidi Bou Said',
 'La Marsa',
 'Sidi Hassine',
 'Ariana',
 'La Soukra',
 'Raoued',
 'Kalâat el-Andalous',
 'Sidi Thabet',
 'Ettadhamen-Mnihla',
 'Ben Arous',
 'El Mourouj',
 'Hammam Lif',
 'Hammam Chott',
 'Bou Mhel el-Bassatine',
 'Ezzahra',
 'Radès',
 'Mégrine',
 'Mohamedia-Fouchana',
 'Mornag',
 'Khalidia',
 'Manouba',
 'Den Den',
 'Douar Hicher',
 'Oued Ellil',
 'Mornaguia',
 'Borj El Amri',
 'Djedeida',
 'Tebourba',
 'El Battan',
 'Nabeul',
 'Dar Chaabane',
 'Béni Khiar',
 'El Maâmoura',
 'Somâa',
 'Korba',
 'Tazerka',
 'Menzel Temime',
 'Menzel Horr',
 'El Mida',
 'Kelibia',
 'Azmour',
 'Hammam Ghezèze',
 'Dar Allouch',
 'El Haouaria',
 'Takelsa',
 'Soliman',
 'Korbous',
 'Menzel Bouzelfa',
 'Béni Khalled',
 'Zaouiet Djedidi',
 'Grombalia',
 'Bou Argoub',
 'Hammamet',
 'Zaghouan',
 'Zriba',
 'Bir Mcherga',
 'Djebel Oust',
 'El Fahs',
 'Nadhour',
 'Bizerte',
 'Sejnane',
 'Mateur',
 'Menzel Bourguiba',
 'Tinja',
 'Ghar al Milh',
 'Aousja',
 'Menzel Jemil',
 'Menzel Abderrahmane',
 'El Alia',
 'Ras Jebel',
 'Metline',
 'Raf Raf',
 'Béja',
 'El Maâgoula',
 'Zahret Medien',
 'Nefza',
 'Téboursouk',
 'Testour',
 'Goubellat',
 'Majaz al Bab',
 'Jendouba',
 'Bou Salem',
 'Tabarka',
 'Aïn Draham',
 'Fernana',
 'Beni M"Tir',
 'Ghardimaou',
 'Oued Melliz',
 'El Kef',
 'Nebeur',
 'Touiref',
 'Sakiet Sidi Youssef',
 'Tajerouine',
 'Menzel Salem',
 'Kalaat es Senam',
 'Kalâat Khasba',
 'Jérissa',
 'El Ksour',
 'Dahmani',
 'Sers',
 'Siliana',
 'Bou Arada',
 'Gaâfour',
 'El Krib',
 'Sidi Bou Rouis',
 'Maktar',
 'Rouhia',
 'Kesra',
 'Bargou',
 'El Aroussa',
 'Sousse',
 'Ksibet Thrayet',
 'Ezzouhour',
 'Zaouiet Sousse',
 'Hammam Sousse',
 'Akouda',
 'Kalâa Kebira',
 'Sidi Bou Ali',
 'Hergla',
 'Enfidha',
 'Bouficha',
 'Sidi El Hani',
 "M'saken",
 'Kalâa Seghira',
 'Messaadine',
 'Kondar',
 'Monastir',
 'Khniss',
 'Ouerdanin',
 'Sahline Moôtmar',
 'Sidi Ameur',
 'Zéramdine',
 'Beni Hassen',
 'Ghenada',
 'Jemmal',
 'Menzel Kamel',
 'Zaouiet Kontoch',
 'Bembla-Mnara',
 'Menzel Ennour',
 'El Masdour',
 'Moknine',
 'Sidi Bennour',
 'Menzel Farsi',
 'Amiret El Fhoul',
 'Amiret Touazra',
 'Amiret El Hojjaj',
 'Cherahil',
 'Bekalta',
 'Téboulba',
 'Ksar Hellal',
 'Ksibet El Mediouni',
 'Benen Bodher',
 'Touza',
 'Sayada',
 'Lemta',
 'Bouhjar',
 'Menzel Hayet',
 'Mahdia',
 'Rejiche',
 'Bou Merdes',
 'Ouled Chamekh',
 'Chorbane',
 'Hebira',
 'Essouassi',
 'El Djem',
 'Kerker',
 'Chebba',
 'Melloulèche',
 'Sidi Alouane',
 'Ksour Essef',
 'El Bradâa',
 'Sfax',
 'Sakiet Ezzit',
 'Chihia',
 'Sakiet Eddaïer',
 'Gremda',
 'El Ain',
 'Thyna',
 'Agareb',
 'Jebiniana',
 'El Hencha',
 'Menzel Chaker',
 'Ghraïba, Tunisia',
 'Bir Ali Ben Khélifa',
 'Skhira',
 'Mahares',
 'Kerkennah',
 'Kairouan',
 'Chebika',
 'Sbikha',
 'Oueslatia',
 'Aïn Djeloula',
 'Haffouz',
 'Alaâ',
 'Hajeb El Ayoun',
 'Nasrallah',
 'Menzel Mehiri',
 'Echrarda',
 'Bou Hajla',
 'Kasserine',
 'Sbeitla',
 'Sbiba',
 'Jedelienne',
 'Thala',
 'Haïdra',
 'Foussana',
 'Fériana',
 'Thélepte',
 'Magel Bel Abbès',
 'Sidi Bouzid',
 'Jilma',
 'Cebalet',
 'Bir El Hafey',
 'Sidi Ali Ben Aoun',
 'Menzel Bouzaiane',
 'Meknassy',
 'Mezzouna',
 'Regueb',
 'Ouled Haffouz',
 'Gabès',
 'Chenini Nahal',
 'Ghannouch',
 'Métouia',
 'Oudhref',
 'El Hamma',
 'Matmata',
 'Nouvelle Matmata',
 'Mareth',
 'Zarat',
 'Medenine',
 'Beni Khedache',
 'Ben Gardane',
 'Zarzis',
 'Houmt El Souk (Djerba)',
 'Midoun (Djerba)',
 'Ajim (Djerba)',
 'Tataouine',
 'Bir Lahmar',
 'Ghomrassen',
 'Dehiba',
 'Remada',
 'Gafsa',
 'El Ksar',
 'Moularès',
 'Redeyef',
 'Métlaoui',
 'Mdhila',
 'El Guettar',
 'Sened',
 'Tozeur',
 'Degache',
 'Hamet Jerid',
 'Nafta',
 'Tamerza',
 'Kebili',
 'Djemna',
 'Douz',
 'El Golâa',
 'Souk Lahad'
 ]