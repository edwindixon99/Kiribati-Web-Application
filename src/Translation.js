import React, { Component, useState} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import './box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import useForceUpdate from 'use-force-update';
import { useHistory } from "react-router-dom";
import Word from "./Word"
import './Style.css'
import TranslationDeleteModal from './TranslationDeleteModal'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"


function Translation({order, kiriPhrase, engPhrase, rating, id, voteType, created}) {
    const [sessionToken,] = useLocalStorage("sessionToken", null)
    const [vote, setVote] = useState(voteType);
    const [removed, setRemoved] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    // const [created, setCreated] = useState("hello:");
    const forceUpdate = useForceUpdate();
    const history = useHistory();


    React.useEffect(() => {
        setVote(voteType);
        // setCreated(createdType)
        // // console.log(createdType)
        // console.log(created)
    }, [voteType])

    function removeTranslation(){
        setRemoved(true);
        if (sessionToken) {
            axios({
                "method": "DELETE",
                "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'x-authorization':sessionToken
                    },
                })
                .then(() => {
                    console.log("complete")
                    
                })
                .catch((error) => {
                    console.log(error)
                })
            
            }
    }

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
                    
                    setVote(1);
                    
                })
                .catch((error) => {
                  
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

    function handleClose() {
        setShowDeleteModal(false)
    }



    return (removed)? null : <div className="Translation container">
                    <div className="row">
                        <div className="col-12 col-xl-5">
                        {(order)
                        ? <Word word={kiriPhrase} isKiri={order}/>
                        : <Word word={engPhrase} isKiri={order}/>
                        }
                        </div>
                        <div className="col-12 col-xl-5">
                        {(order)
                            ? <Word word={engPhrase} isKiri={!order}/>
                            : <Word word={kiriPhrase} isKiri={!order}/>
                        }
                        </div>
                        {sessionToken &&
                        <div className="col-4 col-xl-1">

                        <div className="row">
                        
                        <div className="col">
                        {
                        vote === 1?
                        <FontAwesomeIcon className="clickable-div" style={{"color":"green"}}  icon={faThumbsUp}  size="lg" onClick={removevote}/>
                        : <FontAwesomeIcon className="clickable-div" icon={faThumbsUp}  size="lg" onClick={upvote}/>
                        }
                        </div>
                        <div className="col">
                        {
                        vote === 0?
                        <FontAwesomeIcon className="clickable-div" style={{"color":"red"}}  icon={faThumbsDown}  size="lg" onClick={removevote}/>
                        : <FontAwesomeIcon className="clickable-div" icon={faThumbsDown}  size="lg" onClick={downvote}/>
                        }
                        </div>
                        
                        </div>
                        </div>
                        }
                        <div className="col-6 col-xl-1">
                            <div className="row">
                                <div className="col">
                                    <div className="box" style={chooseColour(rating)}/>
                                </div>
                                <div className="col">
                                    {created && <FontAwesomeIcon className="clickable-div" icon={faTrash}  size="lg" onClick={() => setShowDeleteModal(true)}/>}
                                    {/* {showDeleteModal && <TranslationDeleteModal showModal={setShowDeleteModal} removeTranslation={removeTranslation}/>} */}
                                </div>
                            </div>
                            
                            {/* {created && <FontAwesomeIcon className="INSERTCLICKABLEDIV" icon={faTrash}  size="lg" onClick={downvote}/>} */}
                        </div>
                        {/* <div className="col-3 col-xl-1">
                            
                        </div> */}
                    </div>
                    <br/>

                    <Modal show={showDeleteModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Translation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>are you sure you want to delete this translation?</Modal.Body>
                        {/* <Modal.Body></Modal.Body> */}
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={removeTranslation}>
                            Delete
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
  }
  
  export default Translation;
  