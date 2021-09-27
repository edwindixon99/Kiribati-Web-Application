import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import { render } from '@testing-library/react';
import {Counter} from './features/counter/Counter'
import axios from 'axios'
// import {GetData} from './util/getData'
import { useState, useEffect } from 'react'


let trans = [    
  {
  "kiribati": "ti a boo",
  "english": "good-bye",
  "rating": 0.5
},
{
  "kiribati": "a",
  "english": "indicating immediate past",
  "rating": 0.5
},
{
  "kiribati": "a",
  "english": "they",
  "rating": 0.5
}
];

function App() {
  // let [responseData, setResponseData] = React.useState('');   // new
  // let [searchTerm, setSearchTerm] = React.useState('');
  const [searchParam, setSearchParam] = React.useState('');
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)



  const onSearch = (searchTerm) => {
    // console.log(searchParam)
    setSearchParam(searchTerm)
    // console.log(searchParam)
  }


  useEffect(() => {
      async function fetchTranslations() {
          axios({
          "method": "GET",
          "url": "http://localhost:4941/api/v1/kiribati",
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
      
  }, [searchParam, loading])





  // React.useEffect(() => {
  //   axios({
  //     "method": "GET",
  //     "url": "http://localhost:4941/api/v1/kiribati",
  //     // headers: {
  //     //   'Access-Control-Allow-Origin' : '*',
  //     //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     //   },
  //     "params": {
  //       "q": "a"
  //     }
  //   })
  //   .then((response) => {
  //     setResponseData(response.data)
  //     console.log(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }, [setResponseData, responseData])


  return (
    <div className="App">
      <SearchBar handleSearch={onSearch}/>
      {/* <Loading isLoading={loading}/> */}
      <Translations data={data}/>
    </div>
  );
}

export default App;
