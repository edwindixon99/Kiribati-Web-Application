import Translation from "./Translation"
import { useState, useEffect } from 'react'


function Translations(props) {
    const [voteData, setVoteData] = useState({})
    const [createData, setCreateData] = useState({});
    // 
    const votetype = function(translationId) {
        return props.voteData[parseInt(translationId)]
        
    }

    const didCreate = function(translationId) {
        // console.log(props.createData)
        // console.log(translationId)
        // console.log(props.createData[parseInt(translationId)])
        return props.createData[parseInt(translationId)]
    }

    useEffect(() => {
        console.log("changed")
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
  
        //           setVoteData(requestResponse.data)
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
        //         console.log(requestResponse)
        //         setCreateData(requestResponse.data)
        //       })
        //       .catch((error) => {
          
                
        //         if (error.response.status === 403) {
        //           history.push("/");
        //           alert("Timed out You need to logout.")
        //         }
        //       })
        
        // }
        
    }, [])


    return <div className="Translations container">
            {(props.lang == 'kiribati')
            ? props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={true} rating={translation.rating} id={translation.id} voteType={votetype(translation.id)} created={didCreate(translation.id)}/>)
            : props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={false} rating={translation.rating} id={translation.id} voteType={votetype(translation.id)} created={didCreate(translation.id)}/>)
        }
            </div>;


  }
  
  export default Translations;
  