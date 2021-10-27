import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import GoBack from './GoBack'
import './Style.css'
import { getUserInfo } from './api'




function RecentWordsAdded() {
    const history = useHistory();
    const lang = 'english';
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    
    const [data, setData] = useState([]);
    const [voteData, setVoteData] = useState({});
    const [createData, setCreateData] = useState({});
    const [count, setCount] = useState(50)


    
    
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

      setData(response.data)
      })
      .catch((error) => {
      console.log(error)
      })
      
  }

    useEffect(() => {

      if (sessionToken) {
      getUserInfo(setVoteData, setCreateData, history, sessionToken)
      }
      fetchTranslations()
    
      }, [url, sessionToken])
    

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