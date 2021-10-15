import React, { Component, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import './box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import useForceUpdate from 'use-force-update';
import { useHistory } from "react-router-dom";
import Word from "./Word"


function Translation({order, kiriPhrase, engPhrase, rating, id, voteType}) {
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [vote, setVote] = useState(voteType);
    const forceUpdate = useForceUpdate();
    const history = useHistory();


    React.useEffect(() => {
        setVote(voteType);
    }, [voteType])


    function chooseColour(rating) {
        let r = 0;
        let g = 0;
        if (rating-0.5 > 0) {
            r = 255*(1-(rating-0.5)/0.5);
            g = 255;
        } else {
            r = 255;
            g = 255*(rating/0.5);
        }
        console.log(voteType)
        console.log(vote)
        return {'background-color':`rgb(${r}, ${g}, 0)`};
    } 

    const upvote = function() {
        if (sessionToken) {
            axios({
                "method": "POST",
                "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}/upvote`,
                headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'x-authorization':sessionToken
                  },
                })
                .then((requestResponse) => {
                    console.log(vote)
                    setVote(1);
                    
                })
                .catch((error) => {
                  console.log(error)
                  if (error.response.status === 403) {
                    history.push("/");
                    alert("Timed out You need to logout.")
                  }
                })
          
          }
    }

    const downvote = function() {
        if (sessionToken) {
            axios({
                "method": "POST",
                "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}/downvote`,
                headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'x-authorization':sessionToken
                  },
                })
                .then((requestResponse) => {
                    console.log(vote)
                    setVote(0);
                    
                })
                .catch((error) => {
                  console.log(error)
                })
          
          }
    }


    const removevote = function() {
        if (sessionToken) {
            axios({
                "method": "DELETE",
                "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}/remove`,
                headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  'x-authorization':sessionToken
                  },
                })
                .then(() => {
                    setVote(null);
                    
                })
                .catch((error) => {
                  console.log(error)
                })
          
          }
    }



    return      <div className="Translation container">
                    <div className="row">
                        <div className="col">
                        {(order)
                        ? <Word word={kiriPhrase} isKiri={order}/>
                        : <Word word={engPhrase} isKiri={order}/>
                        }
                        </div>
                        <div className="col">
                        {(order)
                            ? <Word word={engPhrase} isKiri={!order}/>
                            : <Word word={kiriPhrase} isKiri={!order}/>
                        }
                        </div>
                        {sessionToken &&
                        <div className="col-1">

                        <div className="row">
                        
                        <div className="col">
                        {
                        vote === 1?
                        <FontAwesomeIcon style={{"color":"green"}}  icon={faThumbsUp}  size="lg" onClick={removevote}/>
                        : <FontAwesomeIcon icon={faThumbsUp}  size="lg" onClick={upvote}/>
                        }
                        </div>
                        <div className="col">
                        {
                        vote === 0?
                        <FontAwesomeIcon style={{"color":"red"}}  icon={faThumbsDown}  size="lg" onClick={removevote}/>
                        : <FontAwesomeIcon icon={faThumbsDown}  size="lg" onClick={downvote}/>
                        }
                        </div>
                        
                        </div>
                        </div>
                        }
                        <div className="col-1">
                            <div className="box" style={chooseColour(rating)}/>
                        </div>
                    </div>
                </div>;
    

  }
  
  export default Translation;
  