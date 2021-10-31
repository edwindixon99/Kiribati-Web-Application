import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import GoBack from './GoBack'
import './Style.css'
import {fetchTranslations, getUserInfo } from './api'



function TranslationPage(props) {
  const [searchParam, setSearchParam] = React.useState('');
  const [data, setData] = useState([])
  const [exact, setExact] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sessionToken,] = useLocalStorage("sessionToken", null)
  const [voteData, setVoteData] = useState({});
  const [createData, setCreateData] = useState({});
  const history = useHistory();
  const [error, setError] = useState(null)

  let url = "https://acme.kiribatitranslate.com/api/v1/" + props.lang;


  const modifyInput = function(word) {
    return word.trim().replace(/\s+/g,' ');
  }

  const onSearch = (searchTerm, exact) => {
    setSearchParam(modifyInput(searchTerm))
    setExact(exact)

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
    // getUsersVotes(setVoteData, history, sessionToken)
    // getUsersTranslations(setCreateData, history, sessionToken)
    if (sessionToken) {
      getUserInfo(setVoteData, setCreateData, history, sessionToken)
    }

      if (searchParam.length > 0) {
        fetchTranslations(url, searchParam, setData, setError, props.lang, exact)
          
      }
      // if (exact) {
      //   fetchTranslations(url, searchParam, setData, setError, props.lang, exact)
      // }

  }, [searchParam, loading, url, sessionToken, exact])


  return (
    <div className="container">
      <div>
        <GoBack />
      </div>
      <div className="row">
        <SearchBar handleSearch={onSearch} placeholder={`Enter ${props.lang} Word/Phrase`}/>
      </div>
      
      <div className="row">
        {(data.length > 0) && <Translations lang={props.lang} data={data} voteData={voteData} createData={createData}/>}
        {error && error.map((e, i) => <div><h2>{e}</h2></div>)}
      </div>
      <div className="row">
      </div>
      {validSearch(searchParam) && 
        <div >
        <br /><FontAwesomeIcon style={{position: 'absolute', left: '30%', color: "#00F"}} className="plus-icon clickable-div" icon={faPlusCircle}  size="4x" onClick={authedAdd}/>
        </div>}
      
    </div>
  );
}

export default TranslationPage;
