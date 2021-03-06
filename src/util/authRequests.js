import axios from 'axios'
import {useLocalStorage} from '../hooks/useLocalStorage'



export async function login(idtoken, setSessionToken) {
    

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
    })
    .catch((error) => {

      console.log(error)
    })
    
  
    
}

