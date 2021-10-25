import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import GoBack from './GoBack'
import UsersInformation from './UsersInformation'
import './Style.css'
import {fetchTranslations, getUsersVotes, getUsersTranslations } from './api'




function RecentWordsAdded() {
    const history = useHistory();
    const lang = 'english';
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    
    const [data, setData] = useState([]);
    const [voteData, setVoteData] = useState({});
    const [createData, setCreateData] = useState({});
    // const [addSelected, setAddSelected] = useState(false);
    // const [newWord, setNewWord] = useState("")
    // const [error, setError] = useState(null)
    // const [lplaceholder, setLPlaceholder] = useState('')
    const [count, setCount] = useState(50)
    console.log(lang)

    
    
    let url = "https://acme.kiribatitranslate.com/api/v1/translations/recent";
    
    
    
    async function fetchTranslations() {
      axios({
      "method": "GET",
      "url": url,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      "params": {
          "count":count
      },
      })
      .then((response) => {
          console.log(response)
      setData(response.data)
      })
      .catch((error) => {
      console.log(error)
      })
      
  }

    useEffect(() => {
      getUsersVotes(setVoteData, history, sessionToken)
      getUsersTranslations(setCreateData, history, sessionToken)
      fetchTranslations()
    
        // if (sessionToken) {
        //   axios({
        //         "method": "GET",
        //         "url": `https://acme.kiribatitranslate.com/api/v1/translations/votes`,
        //         headers: {
        //           'Access-Control-Allow-Origin' : '*',
        //           'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //           'x-authorization':sessionToken
        //           },
        //         })
        //         .then((requestResponse) => {
    
        //         setVoteData(requestResponse.data)
        //         })
        //         .catch((error) => {
            
        //           console.log(error)
        //           if (error.response.status === 403) {
        //             history.push("/");
        //             alert("Timed out You need to logout.")
        //           }
        //         })

        //     axios({
        //       "method": "GET",
        //       "url": `https://acme.kiribatitranslate.com/api/v1/translations/`,
        //       headers: {
        //         'Access-Control-Allow-Origin' : '*',
        //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         'x-authorization':sessionToken
        //         },
        //       })
        //       .then((requestResponse) => {
        //         console.log(requestResponse.data)
        //       setCreateData(requestResponse.data)
        //       })
        //       .catch((error) => {
          
                
        //         if (error.response.status === 403) {
        //           history.push("/");
        //           alert("Timed out You need to logout.")
        //         }
        //       })                
      
        //   }
          
      }, [url, sessionToken])
    
      
    // let borederless = {"box-shadow":"none", "border":"none"}


    return <div className="container">
            <div><GoBack /></div>
            <div className="row">
              <div className="col">
                <h1>Recently Added Translations</h1>
              </div>
            </div>
            <div style={{"text-decoration": "underline", "color":"grey"}}className="container">
              <div className="row">
                <div className="col-12 col-md-5">
                  <h2>English</h2>
                </div>
                <div className="col-12 col-md-5">
                  <h2>Kiribati</h2>
                </div>
            </div>
            </div>
            <br />
            <br />
            <div className="row">
                <Translations lang={lang} data={data} voteData={voteData} createData={createData} />
            </div>
            <div className="row">
            </div>
        </div>
    

  }
  
  export default RecentWordsAdded;