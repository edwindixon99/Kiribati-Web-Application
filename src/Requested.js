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
import RequestedEnglish from './RequestedEnglish';
import RequestedKiribati from './RequestedKiribati';




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
    const [error, setError] = useState(null)
    const [lplaceholder, setLPlaceholder] = useState('')
    const [showEnglish, setShowEnglish] = useState(true);
    // const [fetchError, setFetchError] = useState(null)
    const [success, setSuccess] = useState(false);

    const getLang = function(language) {
      
       if (language === 'kiribati') {
         return 'Kiribati'
       } else {
          
         return 'English'
       }
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

    

    return <div className="container">
            <div><GoBack /></div>
            <div className="row">
              <div className="col">
                <h1>Requested Words</h1>
              </div>
              


              <div className="row">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary" onClick={() => setShowEnglish(true)}><h2>English</h2></button>
                <button type="button" class="btn btn-secondary" onClick={() => setShowEnglish(false)}><h2>Kiribati</h2></button>
   
              </div>
              </div>
              <div>
                <br />
                <br />
              </div>
              {/* <div className="row"> */}
              {showEnglish? <RequestedEnglish /> : <RequestedKiribati />}
              {/* </div> */}
            </div>
            {/* <div style={{"text-decoration": "underline", "color":"grey"}}className="container">
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

            {/* {wordData.map((wordJson, i) => <><div className="row">
              <AddWordComponent isKiri={wordJson.isKiri} word={wordJson.word} />
              </div>
              <br/>
              <br/>
              
              </>
            )} */}
        </div>
    

  }
  
  export default Requested;