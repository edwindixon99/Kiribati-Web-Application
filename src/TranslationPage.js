import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';



function TranslationPage(props) {
  const [searchParam, setSearchParam] = React.useState('');
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sessionToken,] = useLocalStorage("sessionToken", null)
  const [voteData, setVoteData] = useState({});

  let url = "http://localhost:4941/api/v1/" + props.lang;




  const onSearch = (searchTerm) => {
    // console.log(searchParam)
    setSearchParam(searchTerm)
    // console.log(searchParam)
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
              "q": searchParam
          }
          })
          .then((response) => {
          setData(response.data)
          setLoading(false)
          })
          .catch((error) => {
          console.log(error)
          })
          
      }

      console.log(searchParam)
      if (searchParam) {
          fetchTranslations()
          console.log(data)
      }

      if (sessionToken) {
        axios({
            "method": "GET",
            "url": `http://localhost:4941/api/v1/translations/votes`,
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
            })
      
      }
      
  }, [searchParam, loading, url, sessionToken])


  return (
    <div>
      <SearchBar handleSearch={onSearch} placeholder={`Enter ${props.lang} Word/Phrase`}/>
      {/* <Loading isLoading={loading}/> */}
      <Translations lang={props.lang} data={data} voteData={voteData}/>
    </div>
  );
}

export default TranslationPage;
