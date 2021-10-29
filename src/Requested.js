import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import GoBack from './GoBack'
import './Style.css'
import { getUserInfo, addToRequested } from './api'
import AddWordComponent from './AddWordCompnent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'




function Requested() {
    // const history = useHistory();
    const lang = 'english';
    // const [sessionToken,] = useLocalStorage("sessionToken", null)
    
    // const [data, setData] = useState([]);
    // const [voteData, setVoteData] = useState({});
    // const [createData, setCreateData] = useState({});
    // const [count, setCount] = useState(50)

    const history = useHistory();
    // const { lang, word } = useParams();
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [wordData, setWordData] = useState([]);
    const [voteData, setVoteData] = useState({});
    const [createData, setCreateData] = useState({});
    const [addESelected, setAddESelected] = useState(false);
    const [newEWord, setNewEWord] = useState("")
    const [addKSelected, setAddKSelected] = useState(false);
    const [newKWord, setNewKWord] = useState("")
    const [error, setError] = useState(null)
    const [lplaceholder, setLPlaceholder] = useState('')
    // const [fetchError, setFetchError] = useState(null)
    const [success, setSuccess] = useState(false);

    
    
    let url = "https://acme.kiribatitranslate.com/api/v1/requests";
    
    
    


    const getLang = function(language) {
      
       if (language === 'kiribati') {
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
    
    
    // let url = "https://acme.kiribatitranslate.com/api/v1/translations/recent";
    
    
    
    async function fetchRequestedWords() {
      axios({
      "method": "GET",
      "url": url,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      })
      .then((response) => {

      setWordData(response.data)
      })
      .catch((error) => {
      console.log(error)
      })
      
  }


    function addRequest(word, language) {
      console.log("hello")
      // addToRequested(word, language)
    }

    function requestWordButton(lang, setRequestSelected, newWord, setNewWord, requestSelected) {
        return <>{(requestSelected && sessionToken) && <div className="row">
        <form className="form-inline">
        <input value={newWord} onChange={e => setNewWord(e.target.value)} className="form-control form-control-lg" type="text" placeholder={`Enter ${getLang(lang)} Word`} pattern="^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$"/>
        {error && <div><h2><span className="badge bg-danger">{error}</span></h2></div>}
        <div className="row">
            <div className="col">
                <button type="submit" className="btn btn-secondary btn-lg" onClick={()=> console.log("hello")}>Request</button>
            </div>
            <div className="col">
                <FontAwesomeIcon className="clickable-div" icon={faTimes} size="3x" onClick={() => {setRequestSelected(false); setNewWord("")}}/>
            </div>
        </div>
        </form>
        </div>}
    {!requestSelected && sessionToken && <button onClick={() => {setRequestSelected(true); setSuccess(false)}} className="btn btn-info btn-lg">Request {getLang(lang)} Word Translation</button>}
    {success && <div><h2><span className="badge bg-success">Translation added successfully</span></h2></div>}
    <br />
    <br />
    <br />
    </>
    }

    useEffect(() => {

      // if (sessionToken) {
      // getUserInfo(setVoteData, setCreateData, history, sessionToken)
      // }
      fetchRequestedWords()
    
      }, [])
    

    return <div className="container">
            <div><GoBack /></div>
            <div className="row">
              <div className="col">
                <h1>Requested Words</h1>
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
            {/* <div className="row">
                {sessionToken ? <><div className="col-12 col-md-5">
                {requestWordButton('english', setAddESelected, newEWord, setNewEWord, addESelected)}
                </div>
                <div className="col-12 col-md-5">
                {requestWordButton('kiribati', setAddKSelected, newKWord, setNewKWord, addKSelected)}
                </div>            <br />
            </>
                :<h2><span class="badge bg-warning clickable-div" onClick={() => history.push('/')}>Log in to Request Words and Add Translations</span></h2>}
                
            </div> */}

            {wordData.map((wordJson, i) => <><div className="row">
              <AddWordComponent isKiri={wordJson.isKiri} word={wordJson.word} />
              </div>
              <br/>
              <br/>
              
              </>
            )}
        </div>
    

  }
  
  export default Requested;