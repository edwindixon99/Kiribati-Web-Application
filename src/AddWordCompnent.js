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
import Word from './Word';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'




function AddWordComponent({isKiri, word, disableButton, setDisableButton}) {
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
    const [success, setSuccess] = useState(false);
    const [lang, setLang] = useState(null)


    // const getLang = () => {
    //   setLang((isKiri === 1)? 'kiribati': 'english');
    // }

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
          setSuccess(true)
          setAddSelected(false)
          setNewWord("")
          getUserInfo(setVoteData, setCreateData, history, sessionToken)
        //   fetchTranslations(url, word, setData, setFetchError)

        })
        .catch((error) => {
            setSuccess(false)
          if (error.response.status === 400) {
            setError("Translation Already Exists")
          }
          if (error.response.status === 403) {
            history.push("/");
            alert("Timed out You need to logout.")
          }
        })
        setDisableButton(false);
      }
      if (/^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$/.test(newWord)){
        
        postTranslation()
      } else {
        setSuccess(false)
        setError("Bad input format")
      }  
    }
  
    const exit = function() {
      setAddSelected(false); 
      setNewWord("");
      setError(null)
      console.log(isKiri)
    }


    useEffect(() => {

      setLang((isKiri === 1)? 'kiribati': 'english')
      getPlaceholder(lang)

      // if (sessionToken) {
      //   getUserInfo(setVoteData, setCreateData, history, sessionToken)
      // }

    //   if (word) {
    //       fetchTranslations(url, word, setData, setFetchError)
          
    //   }
        
      if (addSelected) {
        setAddSelected(false)
        setError(null)
        
      }
      setError(null)
    }, [word, url, sessionToken])
    
      
    let borederless = {"box-shadow":"none", "border":"none"}

    function addWord() {
        return <>{(addSelected && sessionToken) && <div className="row">
        <form className="form-inline">
        <input value={newWord} onChange={e => setNewWord(e.target.value)} className="form-control form-control-lg" type="text" placeholder={lplaceholder} pattern="^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$"/>
        {error && <div><h2><span className="badge bg-danger">{error}</span></h2></div>}
        <div className="row">
            <div className="col">
                <button type="submit" className="btn btn-secondary btn-lg" onClick={addTranslation}>Add</button>
            </div>
            <div className="col">
                <FontAwesomeIcon className="clickable-div" icon={faTimes} size="3x" onClick={() => {exit(); setDisableButton(false)}}/>
            </div>
        </div>
        </form>
        </div>}
      {!addSelected && sessionToken && !disableButton && <button onClick={() => {setAddSelected(true); setSuccess(false); setDisableButton(true)}} className="btn btn-primary btn-lg">Add {otherLang(lang)} Translation</button>}
      {!addSelected && sessionToken && disableButton && <button onClick={() => {setAddSelected(true); setSuccess(false); setDisableButton(true)}} className="btn btn-primary btn-lg" disabled>Add {otherLang(lang)} Translation</button>}
      {success && <div><h2><span className="badge bg-success">Translation added successfully</span></h2></div>}
      </>
    }

    return <div className="row">
               <div className="col-12 col-md-6">
               {(lang == 'english')? <Word word={word} isKiri={false} /> : <Word word={word} isKiri={true} />}
              </div>
              <div className="col-12 col-md-6">
                {addWord()}
              </div>
            </div> 

  }
  
  export default AddWordComponent;