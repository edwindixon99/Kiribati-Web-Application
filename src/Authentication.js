import { useState, useEffect } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";






function Authentication() {
  const history = useHistory();
  const [authed, setAuthed] = useState(false)


    const responseGoogle = (response) => {
        console.log("Hello")
        console.log(response);
        console.log(response.tokenId)
        let idtoken = response.tokenId


        async function loginAttempt() {
          axios({
          "method": "POST",
          "url": "http://localhost:4941/api/v1/login",
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          data: {
              "idtoken": idtoken
          }
          })
          .then((response) => {
            setAuthed(true)
          })
          .catch((error) => {
            if (error.response.status == 404) {
              history.push("/register");
            }
            console.log(error)
          })
          
        
          
      }
      loginAttempt()
      

      // console.log(searchParam)
      // if (searchParam) {
      //     fetchTranslations()
      //     console.log(data)
      // }


        
      }

    return <div>
    hello
        {(authed) && <div>hello</div>}
        <GoogleLogin
    clientId="236247714069-pie6693vletboqghfvdptc2tmenva2al.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
}

export default Authentication;