import { useState, useContext } from 'react'
import {RegisterContext} from './RegisterContext'
import axios from 'axios'
import { useHistory } from 'react-router'
import useLocalStorage from "./hooks/useLocalStorage"
import { login } from './util/authRequests'
import { Redirect } from "react-router-dom";
import React, { useEffect } from 'react';



function Register() {
    const [authed, setAuthed] = useState(true)
    const [newUser, SetNewUser] = useContext(RegisterContext)
    const [username, setUsername] = useState('')
    const [sessionToken, setSessionToken] = useLocalStorage("sessionToken", null)
    const [error, setError] = useState(null)
    const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    SetNewUser({...newUser, 'username':username})
    
    async function registerUser() {
      axios({
      "method": "POST",
      "url": "https://acme.kiribatitranslate.com/api/v1/register",
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      data: newUser
      })
      .then((requestResponse) => {
        // setAuthed(true)
        
        setError(null)
        // login(newUser.idtoken, setSessionToken)
        history.push('/')
        alert("Account created successfully! you can now Log in")
        
      })
      .catch((error) => {
        setError("Username already taken")
        console.log(error)
      })
    }

    registerUser();
  }
  useEffect(() => {
    return () => {
      SetNewUser(        {
        'username':'',
        'email':'',
        'idtoken':''
      })
    }
  }, [])

    return (newUser.email != '')? (<div className="container">
        
        <form onSubmit={handleSubmit}>
            <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={newUser.email}/>
    </div>
    </div>
    <div class="form-group row">
    <label for="username" class="col-sm-2 col-form-label">Username</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="Enter Username" required onChange={e=> SetNewUser({...newUser, 'username':e.target.value})}/>
      {error && <div style={{color: "red"}}>{error}</div>}
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>
    </div>)
    :(
      <Redirect to="/" />
    )
    
    
}

export default Register;