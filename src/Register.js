import { useState, useContext } from 'react'
import {RegisterContext} from './RegisterContext'
import axios from 'axios'
import { useHistory } from 'react-router'
import useLocalStorage from "./hooks/useLocalStorage"
import { login } from './util/authRequests'



function Register() {
    const [authed, setAuthed] = useState(true)
    const [newUser, SetNewUser] = useContext(RegisterContext)
    const [username, setUsername] = useState('')
    const [sessionToken, setSessionToken] = useLocalStorage("sessionToken", null)
    const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    SetNewUser({...newUser, 'username':username})
    console.log(newUser)
    async function registerUser() {
      axios({
      "method": "POST",
      "url": "http://localhost:4941/api/v1/register",
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      data: newUser
      })
      .then((requestResponse) => {
        // setAuthed(true)
        console.log(requestResponse)
        // login(newUser.idtoken, setSessionToken)
        history.push('/')
        
      })
      .catch((error) => {
        console.log(error)
      })
    }

    registerUser();
  }

    return <div className="container">
        
        {(authed) && <form onSubmit={handleSubmit}>
            <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={newUser.email}/>
    </div>
    </div>
    <div class="form-group row">
    <label for="username" class="col-sm-2 col-form-label">Username</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="Enter Username" onChange={e=> SetNewUser({...newUser, 'username':e.target.value})}/>
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>}
    </div>
}

export default Register;