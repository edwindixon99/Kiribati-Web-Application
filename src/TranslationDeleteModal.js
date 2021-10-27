import React, { Component, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import './box.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import useForceUpdate from 'use-force-update';
import { useHistory } from "react-router-dom";
import Word from "./Word"
import './Style.css'


function TranslationDeleteModal({removeTranslation, ShowModal}) {
    // const [removed, setRemoved] = useState(false)
    // const [created, setCreated] = useState("hello:");

    // function removeTranslation(){
    //     setRemoved(true);
    // }

    // const removevote = function() {
    //     if (sessionToken) {
    //         axios({
    //             "method": "DELETE",
    //             "url": `https://acme.kiribatitranslate.com/api/v1/translations/${id}/remove`,
    //             headers: {
    //               'Access-Control-Allow-Origin' : '*',
    //               'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //               'x-authorization':sessionToken
    //               },
    //             })
    //             .then(() => {
    //                 setVote(null);
                    
    //             })
    //             .catch((error) => {
    //               console.log(error)
    //             })
          
    //       }
    // }
    console.log("lksadjfljdsflj;lfdsaj")


    return <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => ShowModal(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => ShowModal(false)}>Close</button>
          <button type="button" className="btn btn-primary" onClick={removeTranslation}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
  }
  
  export default TranslationDeleteModal;
  