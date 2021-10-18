import { useHistory } from 'react-router-dom';
import './Style.css'


function Word({isKiri, word}) {
    const history = useHistory();


    function goToWord() {
        
        if (isKiri) {
            history.push('/kiribati/' + word)
        } else {
            history.push('/english/' + word)
        }
        
    }

    // const upvote = function() {
    //     if (sessionToken) {
    //         axios({
    //             "method": "POST",
    //             "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}/upvote`,
    //             headers: {
    //               'Access-Control-Allow-Origin' : '*',
    //               'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //               'x-authorization':sessionToken
    //               },
    //             })
    //             .then((requestResponse) => {
    //                 
    //                 setVote(1);
                    
    //             })
    //             .catch((error) => {
    //               
    //               if (error.response.status === 403) {
    //                 history.push("/");
    //                 alert("Timed out You need to logout.")
    //               }
    //             })
          
    //       }
    // }



    return <div className="clickable-div" onClick={goToWord}><h2>{word}</h2></div>
    

  }
  
  export default Word;