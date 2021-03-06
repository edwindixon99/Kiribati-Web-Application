import axios from 'axios'

async function fetchTranslations(url, word, setData, setError, language, exact = true) {
    axios({
    "method": "GET",
    "url": url,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    "params": {
        "q": word,
        "exact":exact
    },
    })
    .then((requestResponse) => {

      setData(requestResponse.data)
      setError(null)
    })
    .catch((error) => {

      
      if (error.response.status === 404) {
        setData([])
        setError([`no results found for '${word}'`, `e aki reke te taeka anne '${word}'`])
        if (exact) {
          addToRequested(word, language)
        }
      }
    })
  }

async function addToRequested(word, language) {
  const isKiri = (language === "kiribati")? 1: 0;
  if (word.length > 0) {
    axios({
      "method": "POST",
      "url": `https://acme.kiribatitranslate.com/api/v1/requests`,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
      data: {
        "word": word,
        "isKiri":isKiri
      },
      })
      .then((requestResponse) => {

      })
      .catch((error) => {

      })
  }
    
}


async function getUsersVotes(setVoteData, history, sessionToken) {
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
     
async function getUsersTranslations(setCreateData, history, sessionToken) {
        axios({
          "method": "GET",
          "url": `https://acme.kiribatitranslate.com/api/v1/translations/`,
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'x-authorization':sessionToken
            },
          })
          .then((requestResponse) => {
            
            setCreateData(requestResponse.data)
          })
          .catch((error) => {
      
            
            if (error.response.status === 403) {
              history.push("/");
              alert("Timed out You need to logout.")
            }
          })
    
    }


  async function getUserInfo(setVoteData, setCreateData, history, sessionToken) {
    axios({
      "method": "GET",
      "url": `https://acme.kiribatitranslate.com/api/v1/user/info `,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'x-authorization':sessionToken
        },
      })
      .then((requestResponse) => {
        setCreateData(requestResponse.data.translations)
        setVoteData(requestResponse.data.votes)
      })
      .catch((error) => {
  
        
        if (error.response.status === 403) {
          history.push("/");
          alert("Timed out You need to logout.")
        }
      })

}
  

export {fetchTranslations, getUsersVotes, getUsersTranslations, getUserInfo }