import React from 'react'
import './css/settings.css'
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";



function Settings() {
    const user = useSelector((state) => state.auth.user);
    const [editable, setEditable] = useState(false)
    const [newfullname, setNewfullname] = useState(user?.fullname)
    const [newadress, setNewadress] = useState(user?.adress)

    
  return (
    <div className='accountinfo'>
        <div className='whatever'>
        <h1 className='pageheader'>Profile Settings</h1>
        <hr style={{width:'80%'}}/>
        <div className='inforows'>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Full Name</h5>
                    {editable?  <input type="text" className='inputedit' onChange={(e)=>setNewfullname(e.target.value)}
                    value={newfullname} />:<p className="card-text tds-text--500">{newfullname}</p>}
                    <Button variant="primary" onClick={()=> setEditable(!editable)}  >{editable? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Adress</h5>
                    {editable?  <input type="text" className='inputedit' onChange={(e)=>setNewadress(e.target.value)}
                    value={newadress} />:<p className="card-text tds-text--500">{newadress}</p>}
                    <Button variant="primary" onClick={()=> setEditable(!editable)}  >{editable? 'Update':'Edit'}</Button>
                </div>
            </div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Phone</h5>
                    <p className="card-text tds-text--500">{user?.phone}</p>
                    <Button variant="primary" type="Edit" >Edit</Button>
                </div>
            </div>
        </div>
        <hr style={{width:'60%'}}/>
        <div className='inforows'>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title tds-text--500">Email</h5>
                    <p className="card-text tds-text--500">{user?.email}</p>
                    <Button variant="primary" type="Edit" >Edit</Button>
                </div>
            </div>
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title tds-text--500">Account Type</h5>
                        <p className="card-text tds-text--500">{user?.usertype}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr style={{width:'40%'}}/>
        <div>Delete Account</div>
        </div>
    </div>
  )
}

export default Settings