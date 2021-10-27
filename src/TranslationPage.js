import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import UsersInformation from './UsersInformation'
import GoBack from './GoBack'
import './Style.css'
import {fetchTranslations, getUsersVotes, getUsersTranslations, getUserInfo } from './api'



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


  // async function fetchTranslations() {
  //   axios({
  //   "method": "GET",
  //   "url": url,
  //   headers: {
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     },
  //   "params": {
  //       "q": searchParam,
  //       "exact":exact
  //   },
  //   })
  //   .then((response) => {
  //   setData(response.data)
  //   setLoading(false)
  //   })
  //   .catch((error) => {
  //   console.log(error)
  //   })
    
  // }

  const onSearch = (searchTerm, exact) => {
    // 
    setSearchParam(searchTerm)
    setExact(exact)
    // 
    console.log(exact)
    
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

      console.log(searchParam)
      if (searchParam.length > 0) {
        fetchTranslations(url, searchParam, setData, setError, exact)
          
      }
      if (exact) {
        fetchTranslations(url, searchParam, setData, setError, exact)
      }
      // if (sessionToken) {
      //   axios({
      //       "method": "GET",
      //       "url": `https://acme.kiribatitranslate.com/api/v1/translations/votes`,
      //       headers: {
      //         'Access-Control-Allow-Origin' : '*',
      //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //         'x-authorization':sessionToken
      //         },
      //       })
      //       .then((requestResponse) => {

      //       setVoteData(requestResponse.data)
      //       })
      //       .catch((error) => {
        
              
      //         if (error.response.status === 403) {
      //           history.push("/");
      //           alert("Timed out You need to logout.")
      //         }
      //       })

      //     axios({
      //       "method": "GET",
      //       "url": `https://acme.kiribatitranslate.com/api/v1/translations/`,
      //       headers: {
      //         'Access-Control-Allow-Origin' : '*',
      //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //         'x-authorization':sessionToken
      //         },
      //       })
      //       .then((requestResponse) => {
      //         console.log(requestResponse.data)
      //       setCreateData(requestResponse.data)
      //       })
      //       .catch((error) => {
        
              
      //         if (error.response.status === 403) {
      //           history.push("/");
      //           alert("Timed out You need to logout.")
      //         }
      //       })
      
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
      {/* <ReactLoading type={"spokes"} color={"#0000ff"} height={64} width={64} /> */}
      </div>
      {validSearch(searchParam) && 
        <div >
        <br /><FontAwesomeIcon style={{position: 'absolute', left: '30%', color: "#00F"}} className="plus-icon clickable-div" icon={faPlusCircle}  size="4x" onClick={authedAdd}/>
        </div>}
      
    </div>
  );
}

export default TranslationPage;
