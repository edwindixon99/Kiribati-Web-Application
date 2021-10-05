import { Component } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import './box.css'


function Translation({order, kiriPhrase, engPhrase, rating}) {
    const [sessionToken,] = useLocalStorage("sessionToken", null)

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
                            
                        </div>
                        <div className="col-1">
                            {sessionToken && <div className="box" style={chooseColour(rating)}/>}
                        </div>
                    </div>
                </div>;
    

  }
  
  export default Translation;
  