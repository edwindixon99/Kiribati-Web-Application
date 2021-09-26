import Translations from './Translations'
import SearchBar from './SearchBar'
import React from 'react';
import { render } from '@testing-library/react';
import {Counter} from './features/counter/Counter'


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
  let [responseData, setResponseData] = React.useState('');   // new


  React.useEffect(() => {
    setResponseData('hello')
    console.log(responseData)
  }, [setResponseData, responseData])


  return (
    <div className="App"></div>
  );
}

export default App;
