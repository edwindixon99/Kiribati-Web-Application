import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'



function TranslationPage(props) {
  // let [responseData, setResponseData] = React.useState('');   // new
  // let [searchTerm, setSearchTerm] = React.useState('');
  const [searchParam, setSearchParam] = React.useState('');
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  console.log({props})
  let url = "http://localhost:4941/api/v1/" + props.lang;
  console.log(url);



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
      
  }, [searchParam, loading, url])


  return (
    <div>
      <SearchBar handleSearch={onSearch} placeholder={`Enter ${props.lang} Word/Phrase`}/>
      {/* <Loading isLoading={loading}/> */}
      <Translations lang={props.lang} data={data}/>
    </div>
  );
}

export default TranslationPage;
