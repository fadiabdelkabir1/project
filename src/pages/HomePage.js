import React from "react";
import { useState } from "react";
import axios from "axios";



const HomePage = () => {
    const [file,setFile]=useState("")
    const sendFile=()=>async()=>{
        const data= new FormData();;
        data.append("file",file);
        axios.post("http://localhost:5000/api/user/profileimage",data)
        .then(res=>console.log("front",res))
        .catch(err=>console.log("front",err))

    }
    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <h5>upload your file</h5>
            <input type="file" name="file" accept=".jpg" onChange={(e)=>setFile(e.target.files[0])}></input>
            <button onClick={sendFile()}>send</button>
            <img src="/images/logo.jpg" alt="prof"/>
        </div>
    );
};

export default HomePage;
