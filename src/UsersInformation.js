import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import GoBack from './GoBack'
import './Style.css'



function UsersInformation({setVoteData, setCreateData}) {
  const [sessionToken,] = useLocalStorage("sessionToken", null)
  const history = useHistory();

  useEffect(() => {
    
      if (sessionToken) {
        axios({
            "method": "GET",
            "url": `https://acme.kiribatitranslate.com/api/v1/translations/votes`,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'x-authorization':sessionToken
              },
            })
            .then((requestResponse) => {

                setVoteData(requestResponse.data)
            })
            .catch((error) => {
        
              
              if (error.response.status === 403) {
                history.push("/");
                alert("Timed out You need to logout.")
              }
            })

          axios({
            "method": "GET",
            "url": `https://acme.kiribatitranslate.com/api/v1/translations/`,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'x-authorization':sessionToken
              },
            })
            .then((requestResponse) => {
              console.log(requestResponse)
              setCreateData(requestResponse.data)
            })
            .catch((error) => {
        
              
              if (error.response.status === 403) {
                history.push("/");
                alert("Timed out You need to logout.")
              }
            })
      
      }
      
  }, [sessionToken])


  return (
    <div />
  );
}

export default UsersInformation;
