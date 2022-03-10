import React from 'react'
import './css/settings.css'
import { useSelector } from "react-redux";
import { Button} from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHandler, editHandler } from '../redux/actions/edit-action';
import { logoutHandler } from '../redux/actions/auth-action';
import axios from "axios";
import { MDBInput } from "mdbreact";

function Settings() {
    const user = useSelector((state) => state.auth.user);
    const [editablename, setEditablename] = useState(false)
    const [editableadress, setEditableadress] = useState(false)
    const [editablephone, setEditablephone] = useState(false)
    const [editableemail, setEditableemail] = useState(false)
    const [editablepassword, setEditablepassword] = useState(false)
    const [editablephoto, setEditablephoto] = useState(false)
    const [newfullname, setNewfullname] = useState(user.fullname)
    const [newadress, setNewadress] = useState(user.adress)
    const [newphone, setNewphone] = useState(user.phone)
    const [newemail, setNewemail] = useState(user.email)
    const [newpassword, setNewpassword] = useState(user.password)
    const dispatch =useDispatch()
    const submissionHandler=()=>{
        dispatch(editHandler(user._id,{fullname:newfullname,adress:newadress,password:newpassword,phone:newphone,email:newemail,profilepic:`/images/imagesfor${user.fullname+user._id}/${user.fullname+user._id}.jpg`}))
        }
    const deleteUser=()=>{
        dispatch(deleteHandler(user._id))
        dispatch(logoutHandler())
    }

    const [file,setFile]=useState("")
 
    const sendFile=()=>async()=>{
        setEditablephoto(!editablephoto)
        const data= new FormData();
        data.append("file",file);
        axios.post("http://localhost:5000/api/user/profileimage",data,{
            headers: {
              'fullname': user.fullname,
              'id':user._id
            }
          })
        .then(res=>console.log("front",res))
        .catch(err=>console.log("front",err))
        submissionHandler()
        
    }


  return (
    <div className='accountinfo'>
        <div className='whatever'>
            <h1 className='pageheader'>Profile Settings</h1>
            <div className='photodivision'>
                <img src={user.profilepic} className='profilephoto'  alt="prof"/>
                <div className='inputsection'>
                    <MDBInput id="file" type="file"  name="file" accept=".jpg" onChange={(e)=>{setFile(e.target.files[0]) }}/>
                    <Button variant="primary" onClick={sendFile()}>Update</Button>
                </div>
        </div>
        <hr style={{width:'80%'}}/>
        <div className='inforows'>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Full Name</h5>
                    {editablename?  <input type="text" className='inputedit' onChange={(e)=>setNewfullname(e.target.value)}
                    value={newfullname} />:<p className="card-text tds-text--500">{newfullname}</p>}
                    <Button variant="primary" onClick={()=>{setEditablename(!editablename); submissionHandler()}}  >{editablename? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Adress</h5>
                    {editableadress?  <input type="text" className='inputedit' onChange={(e)=>setNewadress(e.target.value)}
                    value={newadress} />:<p className="card-text tds-text--500">{newadress}</p>}
                    <Button variant="primary" onClick={()=>{setEditableadress(!editableadress); submissionHandler()}}  >{editableadress? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Phone</h5>
                    {editablephone?  <input type="number" className='inputedit' onChange={(e)=>setNewphone(e.target.value)}
                    value={newphone} />:<p className="card-text tds-text--500">{newphone}</p>}
                    <Button variant="primary" onClick={()=>{setEditablephone(!editablephone); submissionHandler()}}  >{editablephone? 'Update':'Edit'}</Button>
                </div>
            </div>
        </div>
        <hr style={{width:'80%'}}/>
        <div className='inforows'>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Email</h5>
                    {editableemail?  <input type="email" className='inputedit' onChange={(e)=>setNewemail(e.target.value)}
                    value={newemail} />:<p className="card-text tds-text--500">{newemail}</p>}
                    <Button variant="primary" onClick={()=>{setEditableemail(!editableemail); submissionHandler()}}  >{editableemail? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Password</h5>
                    {editablepassword?  <input type="password" className='inputedit' onChange={(e)=>setNewpassword(e.target.value)}
                    value={newpassword} />:<p className="card-text tds-text--500">********</p>}
                    <Button variant="primary" onClick={()=>{setEditablepassword(!editablepassword); submissionHandler()}}  >{editablepassword? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Account Type</h5>
                    <p className="card-text tds-text--500">{user.usertype}</p>
                </div>
            </div>
            
        </div>
        <hr style={{width:'40%'}}/>
        <Button id="deletebutton" variant="primary" onClick={deleteUser}>Delete Account</Button>
        </div>
    </div>
    )
}

export default Settings