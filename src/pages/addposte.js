import React, { useEffect } from 'react'
import {useState} from "react";
import { Link } from "react-router-dom";
import {Form,Row,Col,Button} from 'react-bootstrap'
import './css/addposte.css'
import Appartement from '../components/featurestoshow/Appartement';
import CommStore from '../components/featurestoshow/CommStore';
import House from '../components/featurestoshow/House';
import { MDBInput } from "mdbreact";
import { addPosteHandler, addPostePhotosHandler } from '../redux/actions/poste-action';
import { useDispatch, useSelector } from 'react-redux';

function Addposte() {
    const user = useSelector((state) => state.auth.user);
    //main proprety states
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [adress, setadress] = useState("")
    const [city, setCity] = useState("")
    const [stateadr, setStateadr] = useState("")
    const [zipp, setZipp] = useState("")
    const [proptype, setProptype] = useState("")
    const [dwellingtype,setDwellingtype]=useState("")
    //----------------------
    //house states
    const [stories, setStories] = useState("")
    const [houserooms, setHouserooms] = useState("")
    const [housekitchens, setHousekitchens] = useState("")
    const [housebathrooms, setHouseBathrooms] = useState("")
    const [gardenarea, setGardenarea] = useState("")
    const [housebalconies, setHousebalconies] = useState("")
    //----------------------
    //comm states
    const [BackOffice, setBackOffice] = useState("")
    const [Commfloor, setCommfloor] = useState("")
    const [Backdoor, setBackdoor] = useState("")
    const [Displaywindow, setDisplaywindow] = useState("")
    const [Commelevator, setCommelevator] = useState("")
    const [Commentries, setCommentries] = useState("")
    //----------------------
    //app states
    const [floor, setFloor] = useState("")
    const [rooms, setRooms] = useState("")
    const [kitchens, setKitchens] = useState("")
    const [bathrooms, setBathrooms] = useState("")
    const [elevator, setElevator] = useState("")
    const [balconies, setBalconies] = useState("")
    //----------------------
    const [images,setImages]=useState([])
    const [imageURLs,setImageURLs]=useState([])
    const [tostoreimages,setTostoreimages]=useState([])
    const [Latidute, setLatidute] = useState()
    const [Longitude, setLongitude] = useState()


    const typeHandler=(e)=>{
        setDwellingtype(e.target.value)
        setProptype(e.target.value)
    }
    var moreFeatures;  
    
var infofeatures;
    if (dwellingtype==="House") {
        moreFeatures = <House setStories={setStories} setHouserooms={setHouserooms} setHousekitchens={setHousekitchens} setHouseBathrooms={setHouseBathrooms} setGardenarea={setGardenarea} setHousebalconies={setHousebalconies}  />
        infofeatures= {stories:stories,houserooms:houserooms,housekitchens:housekitchens,housebathrooms:housebathrooms,gardenarea:gardenarea,housebalconies:housebalconies}
    } else if(dwellingtype==="Appartement") {
        moreFeatures = <Appartement  setFloor={setFloor} setRooms={setRooms} setKitchens={setKitchens} setBathrooms={setBathrooms} setElevator={setElevator} setBalconies={setBalconies} />;
        infofeatures={floor:floor,rooms:rooms,kitchens:kitchens,bathrooms:bathrooms,elevator:elevator,balconies:balconies}
   
    }else if (dwellingtype==="Commercial Store"){
        moreFeatures = <CommStore setBackOffice={setBackOffice} setCommfloor={setCommfloor} setBackdoor={setBackdoor} setDisplaywindow={setDisplaywindow} setCommelevator={setCommelevator} setCommentries={setCommentries} />;
        infofeatures={BackOffice:BackOffice,Commfloor:Commfloor,Backdoor:Backdoor,Displaywindow:Displaywindow,Commelevator:Commelevator,Commentries:Commentries}
    }
    else{
        moreFeatures=<div>Please choose the proprety type</div>
        infofeatures='no features'
    }
    const [imgs, setImgs] = useState([])
    useEffect(()=>{
        if (imgs.length<1)return;
        const newImageUrls=[]
        imgs.forEach(image=>newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    },[imgs])

    function onImageChange(e){
        setTostoreimages(e.target.files)
        setImgs([...e.target.files])
        for (let i = 0; i < e.target.files.length; i++) {
            images.push(e.target.files[i].name)
          }
    }
        
    const poste_id=title+price+zipp+Date.now()
    const formData = new FormData();
    Object.values(tostoreimages).forEach(image=>{
    formData.append("multi-files", image);})
    const infoData={landlord:user._id,poste_id:poste_id,images:images,title:title,price:price,adress:adress,city:city,
        state:stateadr,zip:zipp,type:proptype,moreFeatures:infofeatures,coordinates:{lat:Latidute,lng:Longitude}}

    const dispatch = useDispatch();
    const addpostetodatab = (e) => {
        dispatch(addPostePhotosHandler(formData,user.fullname,user._id,poste_id))
        dispatch(addPosteHandler(infoData));
        
        
        
    };


  return (
    <div className='global'>
        <Form>
            <Row className="mb-3">
                <MDBInput id="file" type="file"  multiple accept="image/*" name="multi-files" onChange={onImageChange} />
                <div className='imgdiv'>
                { imageURLs.map(imageSrc => <img alt="prop display"  src={imageSrc} key={imageSrc}/>) }
                </div>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                <Form.Label>Poste Title</Form.Label>
                <Form.Control type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Monthely Rate</Form.Label>
                <Form.Control type="number" placeholder="100£" onChange={(e)=>setPrice(e.target.value)}/>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address of the proprety</Form.Label>
                <Form.Control placeholder="1234 Main St" onChange={(e)=>setadress(e.target.value)}/>
            </Form.Group>

            <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select  onChange={(e)=>setStateadr(e.target.value)}>
                    {statesList.map(state=><option>{state}</option>)}
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Select  onChange={(e)=>setCity(e.target.value)}>
                    {countriesList.map(city=><option>{city}</option>)}
                    
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="number" onChange={(e)=>setZipp(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Proprety Type</Form.Label>
                <Form.Select defaultValue="" onChange={(e)=>typeHandler(e)} >
                    <option></option>
                    <option>House</option>
                    <option>Appartement</option>
                    <option>Commercial Store</option>
                </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">Coordinates
                <Form.Group as={Col} >
                <Form.Label>Latidute</Form.Label>
                <Form.Control type="number" placeholder="55,55" onChange={(e)=>setLatidute(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="number" placeholder="55,55" onChange={(e)=>setLongitude(e.target.value)}/>
                </Form.Group>
            </Row>
            {moreFeatures}
            <Link to={`/`}><Button variant="primary" onClick={(e)=>{addpostetodatab(e)}}>ADD OFFER</Button></Link> 

        </Form>
        
    
    </div>
)
}

export default Addposte


const statesList=["Choose...","Tunis", "Ariana", "Ben Arous", "Mannouba", "Bizerte", "Nabeul", "Béja", "Jendouba", "Zaghouan", 
"Siliana", "Le Kef", "Sousse", "Monastir", "Mahdia", "Kasserine", "Sidi Bouzid", "Kairouan", "Gafsa", "Sfax", "Gabès", "Médenine",
 "Tozeur", "Kebili", "Tataouine"]
 const countriesList=["Choose...",'Tunis',
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