import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';




function WordPage() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [voteData, setVoteData] = useState({});
    const { lang, word } = useParams();
    const [addSelected, setAddSelected] = useState(false);
    const [newWord, setNewWord] = useState("")
    console.log(lang)

    let url = "https://acme.kiribatitranslate.com/api/v1/" + lang;

    const addTranslation = function(e) {
      e.preventDefault();
      console.log(newWord)
      // setAddSelected(false)
      
    }

    useEffect(() => {
        async function fetchTranslations() {
            axios({
            "method": "GET",
            "url": url,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
            "params": {
                "q": word,
                "exact":true
            },
            })
            .then((response) => {
            setData(response.data)
            })
            .catch((error) => {
            console.log(error)
            })
            
        }
  
        if (word) {
            fetchTranslations()
            console.log(data)
        }
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
            
                  console.log(error)
                  if (error.response.status === 403) {
                    history.push("/");
                    alert("Timed out You need to logout.")
                  }
                })
          
          }
          
          if (addSelected) {
            setAddSelected(false)
          }
      }, [word, url, sessionToken])
    
  


    return <div className="container">
            <div className="row">
              <div className="col">
                <h1>{word}</h1>
              </div>
              <div className="col">
                {addSelected && <div className="row">
                  <form className="form-inline">
                  <input value={newWord} onChange={e => setNewWord(e.target.value)} className="form-control form-control-lg" type="text" placeholder="Enter Translation" required/>
                  <button type="submit" className="btn btn-secondary btn-lg" onClick={addTranslation}>Add</button>
                  </form>
                  </div>}
                {!addSelected && <button onClick={() => setAddSelected(true)} className="btn btn-primary btn-lg">Add Translation</button>}
                
              </div>
            </div>
            <br />
            <br />
            <div className="row">
                <Translations lang={lang} data={data} voteData={voteData}/>
            </div>
        </div>
    

  }
  
  export default WordPage;