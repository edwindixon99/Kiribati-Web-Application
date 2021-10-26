import axios from 'axios'

async function fetchTranslations(url, word, setData, exact = true, setError) {
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
      }
    })
  }



// if (error.response.status === 404) {
//   setError([`no results found for '${word}'`, `e aki reke te taeka anne '${word}'`])
// } else {
//   setError(["Something went wrong with the server!"])
// }


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
        console.log(requestResponse)
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