import { useState, useEffect } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


function Authentication() {
    const [authed, setAuthed] = useState(false)


    const responseGoogle = (response) => {
        console.log("Hello")
        console.log(response);
        console.log(response.dt.Ot);
        setAuthed(true);
        
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