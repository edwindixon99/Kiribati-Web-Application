import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './Style.css'



function TranslationPage(props) {
  const [searchParam, setSearchParam] = React.useState('');
  const [data, setData] = useState([])
  const [exact, setExact] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sessionToken,] = useLocalStorage("sessionToken", null)
  const [voteData, setVoteData] = useState({});
  const history = useHistory();

  let url = "https://acme.kiribatitranslate.com/api/v1/" + props.lang;


  async function fetchTranslations() {
    axios({
    "method": "GET",
    "url": url,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    "params": {
        "q": searchParam,
        "exact":exact
    },
    })
    .then((response) => {
    setData(response.data)
    setLoading(false)
    })
    .catch((error) => {
    console.log(error)
    })
    
  }

  const onSearch = (searchTerm, exact) => {
    // 
    setSearchParam(searchTerm)
    setExact(exact)
    // 
    fetchTranslations()
  }

  const validSearch = (search) => {
    return /^[a-zA-Z0-9.!?\\-]+( [a-zA-Z0-9.!?\\-]+)*$/.test(search)
  }

  const authedAdd = () => {
    if (sessionToken) {
      history.push(`/${props.lang}/` + searchParam)
    } else {
      alert("Need to be logged in to add translations!")
    }
    
  }

  useEffect(() => {
    

      console.log(searchParam)
      if (searchParam) {
          fetchTranslations()
          
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
        
              
              if (error.response.status === 403) {
                history.push("/");
                alert("Timed out You need to logout.")
              }
            })
      
      }
      
  }, [searchParam, loading, url, sessionToken])


  return (
    <div className="container">
      <div className="row">
        <SearchBar handleSearch={onSearch} placeholder={`Enter ${props.lang} Word/Phrase`}/>
      </div>
      <div className="row">
        <Translations lang={props.lang} data={data} voteData={voteData}/>
      </div>
      {validSearch(searchParam) && 
        <div>
        <br /><FontAwesomeIcon style={{position: 'absolute', left: '30%', color: "#00F"}} className="plus-icon clickable-div" icon={faPlusCircle}  size="4x" onClick={authedAdd}/>
        </div>}
      {/* <Loading isLoading={loading}/> */}
    </div>
  );
}

export default TranslationPage;
