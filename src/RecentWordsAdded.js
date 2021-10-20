import Translations from './Translations'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator'
import GoBack from './GoBack'
import './Style.css'




function RecentWordsAdded() {
    const history = useHistory();
    const lang = 'english';
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    
    const [data, setData] = useState([]);
    const [voteData, setVoteData] = useState({});
    // const [addSelected, setAddSelected] = useState(false);
    // const [newWord, setNewWord] = useState("")
    // const [error, setError] = useState(null)
    // const [lplaceholder, setLPlaceholder] = useState('')
    const [count, setCount] = useState(50)
    console.log(lang)

    
    
    let url = "https://acme.kiribatitranslate.com/api/v1/translations/recent";
    
    
    
    async function fetchTranslations() {
      await new Promise(resolve => setTimeout(resolve, 10000))
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

    // const otherLang = function(language) {
      
    //    if (language === 'english') {
    //      return 'Kiribati'
    //    } else {
          
    //      return 'English'
    //    }
    // }
    // const getPlaceholder = function(language) {
    //   if (language === 'english') {
    //     setLPlaceholder('in Kiribati means')
    //   } else {
    //     setLPlaceholder('in English means')
    //   }
    // }
    // const addTranslation = function(e) {
    //   e.preventDefault();
      
    //   // setAddSelected(false)
    //   async function postTranslation() {
    //   axios({
    //     "method": "POST",
    //     "url": `https://acme.kiribatitranslate.com/api/v1/${lang}/${word}`,
    //     headers: {
    //       'Access-Control-Allow-Origin' : '*',
    //       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //       'x-authorization':sessionToken
    //       },
    //     data: {"translation": newWord}
    //     })
    //     .then((requestResponse) => {
    //       setError(null)
    //       setAddSelected(false)
    //       setNewWord("")
    //       fetchTranslations()

        
    //     })
    //     .catch((error) => {
    
    //       if (error.response.status === 400) {
    //         setError("Translation Already Exists")
    //       }
    //       if (error.response.status === 403) {
    //         history.push("/");
    //         alert("Timed out You need to logout.")
    //       }
    //     })
    //   }
    //   if (/^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$/.test(newWord)){
        
    //     postTranslation()
    //   } else {
    //     setError("Bad input format")
    //   }
    //   // postTranslation()    
    // }
  

    useEffect(() => {
    //   getPlaceholder(lang)
      // if (!/^[a-zA-Z0-9.!?_\\-]+( [a-zA-Z0-9.!?_\\-]+)*$/.test(word)) {
      //   history.goBack()
      // }
        
      trackPromise(fetchTranslations())
    
        if (sessionToken) {
          trackPromise(axios({
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
                }))
          
          }
          
        //   if (addSelected) {
        //     setAddSelected(false)
        //     setError(null)
        //   }
        //   setError(null)
      }, [url, sessionToken])
    
      
    // let borederless = {"box-shadow":"none", "border":"none"}


    return <div className="container">
            <div><GoBack /></div>
            <div className="row">
              <div className="col">
                <h1>Recently Added Translations</h1>
              </div>
              {/* <div className="col-12 col-md-6">
                {addSelected && sessionToken && <div className="row">
                  <form className="form-inline">
                  <input value={newWord} onChange={e => setNewWord(e.target.value)} style={borederless} className="form-control form-control-lg" type="text" placeholder={lplaceholder} pattern="^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$"/>
                  {error && <div><h2><span className="badge bg-danger">{error}</span></h2></div>}
                  <button type="submit" className="btn btn-secondary btn-lg" onClick={addTranslation}>Add</button>
                  </form>
                  </div>}
                {!addSelected && sessionToken && <button onClick={() => setAddSelected(true)} className="btn btn-primary btn-lg">Add {otherLang(lang)} Translation</button>}
                
              </div> */}
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
                <Translations lang={lang} data={data} voteData={voteData}/>
            </div>
            <div className="row">
              <LoadingIndicator />
            </div>
        </div>
    

  }
  
  export default RecentWordsAdded;