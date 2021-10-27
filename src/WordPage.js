import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import GoBack from './GoBack'
import './Style.css'
import AddWordComponent from './AddWordComponent'
import {fetchTranslations, getUserInfo } from './api'




function WordPage() {
    const history = useHistory();
    const { lang, word } = useParams();
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
      if (/^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$/.test(newWord)){
        
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


    return <div className="container">
            <div><GoBack /></div>
              <AddWordComponent word={word} lang={lang} />
            <br />
            <br />
            <div className="row">
                {(fetchError)? fetchError.map((e, i) => <div><h2>{e}</h2></div>) : <Translations lang={lang} data={data} voteData={voteData} createData={createData} />}
            </div>
        </div>
    

  }
  
  export default WordPage;