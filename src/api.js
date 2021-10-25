import axios from 'axios'

async function fetchTranslations(url, word, setData, exact = true) {
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
    .then((response) => {
    setData(response.data)
    })
    .catch((error) => {
    console.log(error)
    })
    
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
            console.log(requestResponse)
            setCreateData(requestResponse.data)
          })
          .catch((error) => {
      
            
            if (error.response.status === 403) {
              history.push("/");
              alert("Timed out You need to logout.")
            }
          })
    
    }

    

export {fetchTranslations, getUsersVotes, getUsersTranslations }