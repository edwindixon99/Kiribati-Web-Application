import { useState, useEffect, useContext } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { useHistory } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage"

import {RegisterContext} from './RegisterContext'
import userEvent from '@testing-library/user-event';





function Authentication() {
  const history = useHistory();
  const [sessionToken, setSessionToken] = useLocalStorage("sessionToken", null)
  const [newUser, SetNewUser] = useContext(RegisterContext)

  // const [authed, setAuthed] = useState(false)


    const responseGoogle = (response) => {
        
        
        
        let idtoken = response.tokenId


        async function loginAttempt() {
          
          axios({
          "method": "POST",
          "url": "https://acme.kiribatitranslate.com/api/v1/login",
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          data: {
              "idtoken": idtoken
          }
          })
          .then((requestResponse) => {
            // setAuthed(true)
            
            setSessionToken(requestResponse.data);
            history.push("/");
          })
          .catch((error) => {
            if (error.response.status === 404) {
              
              
              
              SetNewUser({username:'', 'email':response.dt.Ot, 'idtoken':response.tokenId})
              history.push("/register");
              //
            }
            console.log(error)
          })
          
        
          
      }
      loginAttempt()

      }
    //   async function logoutAttempt() {
    //     axios({
    //     "method": "POST",
    //     "url": "https://acme.kiribatitranslate.com/api/v1/logout",
    //     headers: {
    //       'Access-Control-Allow-Origin' : '*',
    //       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //       },
    //     data: {
    //         "idtoken": idtoken
    //     }
    //     })
    //     .then((response) => {
    //       setAuthed(true)
    //       console.log(response)
    //     })
    //     .catch((error) => {
    //       if (error.response.status == 404) {
    //         history.push("/register");
    //       }
    //       console.log(error)
    //     })
        
      
        
    // }

  const logout = () => {
    // setAuthed(false)
    setSessionToken(null)

    async function logoutAttempt() {
      axios({
      "method": "POST",
      "url": "https://acme.kiribatitranslate.com/api/v1/logout",
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'x-authorization':sessionToken
        },
      })
      .then((requestResponse) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error)
      })
      
      
  }
  logoutAttempt()

  }

    return <div>
        {sessionToken && <GoogleLogout
      clientId="236247714069-pie6693vletboqghfvdptc2tmenva2al.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>}
    {!sessionToken && <GoogleLogin
    clientId="236247714069-pie6693vletboqghfvdptc2tmenva2al.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={responseGoogle}
    onFailure={err => console.log('fail', err)}
    cookiePolicy={'single_host_origin'}
  />}
        
    </div>
}

export default Authentication;