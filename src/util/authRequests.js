import axios from 'axios'
import {useLocalStorage} from '../hooks/useLocalStorage'



export async function login(idtoken, setSessionToken) {
    

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
    .then((requestResponse) => {
      // setAuthed(true)
      console.log(requestResponse)
      setSessionToken(requestResponse.data);
    })
    .catch((error) => {

      console.log(error)
    })
    
  
    
}