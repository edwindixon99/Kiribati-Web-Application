import { Component, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import './box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'


function Translation({order, kiriPhrase, engPhrase, rating}) {
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [voted, setVoted] = useState(true);

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
        return {'background-color':`rgb(${r}, ${g}, 0)`};
    } 


    return      <div className="Translation container">
                    <div className="row">
                        <div className="col-5">
                        {(order)
                        ? <h2>{kiriPhrase}</h2>
                        : <h2>{engPhrase}</h2>
                        }
                        </div>
                        <div className="col-5">
                        {(order)
                            ? <h2>{engPhrase}</h2>
                            : <h2>{kiriPhrase}</h2>
                        }
                        </div>
                        <div className="col-1">

                        <div className="row">

                        <div className="col">
                        {
                        voted?
                        <FontAwesomeIcon style={{"color":"green"}}  icon={faThumbsUp}  size="lg"/>
                        : <FontAwesomeIcon icon={faThumbsUp}  size="lg"/>
                        }
                        </div>
                        <div className="col">
                        {
                        voted?
                        <FontAwesomeIcon style={{"color":"red"}}  icon={faThumbsDown}  size="lg"/>
                        : <FontAwesomeIcon icon={faThumbsDown}  size="lg"/>
                        }
                        </div>
                        </div>
                        </div>
                        <div className="col-1">
                            {sessionToken && <div className="box" style={chooseColour(rating)}/>}
                        </div>
                    </div>
                </div>;
    

  }
  
  export default Translation;
  