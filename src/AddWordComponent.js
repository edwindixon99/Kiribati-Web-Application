import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import GoBack from './GoBack'
import './Style.css'
import {fetchTranslations, getUserInfo } from './api'




function AddWordComponent({lang, word, addTranslation}) {
    const history = useHistory();
    // const { lang, word } = useParams();
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [data, setData] = useState([]);
    const [voteData, setVoteData] = useState({});
    const [createData, setCreateData] = useState({});
    const [addSelected, setAddSelected] = useState(false);
    const [newWord, setNewWord] = useState("")
    const [error, setError] = useState(null)
    const [lplaceholder, setLPlaceholder] = useState('')
    const [fetchError, setFetchError] = useState(null)

    
    
    let url = "https://acme.kiribatitranslate.com/api/v1/" + lang;
    
    
    


    const otherLang = function(language) {
      
       if (language === 'english') {
         return 'Kiribati'
       } else {
          
         return 'English'
       }
    }
    const getPlaceholder = function(language) {
      if (language === 'english') {
        setLPlaceholder('in Kiribati means')
      } else {
        setLPlaceholder('in English means')
      }
    }
    const addTranslation = function(e) {
      e.preventDefault();
      
      async function postTranslation() {
      axios({
        "method": "POST",
        "url": `https://acme.kiribatitranslate.com/api/v1/${lang}/${word}`,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'x-authorization':sessionToken
          },
        data: {"translation": newWord}
        })
        .then((requestResponse) => {
          setError(null)
          setAddSelected(false)
          setNewWord("")
          getUserInfo(setVoteData, setCreateData, history, sessionToken)
          fetchTranslations(url, word, setData, setFetchError)

        })
        .catch((error) => {
    
          if (error.response.status === 400) {
            setError("Translation Already Exists")
          }
          if (error.response.status === 403) {
            history.push("/");
            alert("Timed out You need to logout.")
          }
        })
      }
      if (/^[a-zA-Z0-9.\'!?\\-]+( [a-zA-Z0-9.\'!?\\-]+)*$/.test(newWord)){
        
        postTranslation()
      } else {
        setError("Bad input format")
      }  
    }
  

    useEffect(() => {
      getPlaceholder(lang)

      if (sessionToken) {
        getUserInfo(setVoteData, setCreateData, history, sessionToken)
      }

      if (word) {
          fetchTranslations(url, word, setData, setFetchError)
          
      }
        
      if (addSelected) {
        setAddSelected(false)
        setError(null)
      }
      setError(null)
    }, [word, url, sessionToken])
    
      
    let borederless = {"box-shadow":"none", "border":"none"}


    return <div className="row">
              <div className="col">
                <h1>{word}</h1>
              </div>
              <div className="col-12 col-md-6">
                {addSelected && sessionToken && <div className="row">
                  <form className="form-inline">
                  <input value={newWord} onChange={e => setNewWord(e.target.value)} className="form-control form-control-lg" type="text" placeholder={lplaceholder} pattern="^[a-zA-Z0-9.\'!?\\-]+( [a-zA-Z0-9.\'!?\\-]+)*$"/>
                  {error && <div><h2><span className="badge bg-danger">{error}</span></h2></div>}
                  <button type="submit" className="btn btn-secondary btn-lg" onClick={addTranslation}>Add</button>
                  </form>
                  </div>}
                {!addSelected && sessionToken && <button onClick={() => setAddSelected(true)} className="btn btn-primary btn-lg">Add {otherLang(lang)} Translation</button>}
                
              </div>
            </div>

    

  }
  
  export default AddWordComponent;