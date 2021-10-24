import Translation from "./Translation"


function Translations(props) {

    // 
    const votetype = function(translationId) {
        return props.voteData[parseInt(translationId)]
        
    }

    const didCreate = function(translationId) {
        return props.createData[parseInt(translationId)]
    }




    return <div className="Translations container">
            {(props.lang == 'kiribati')
            ? props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={true} rating={translation.rating} id={translation.id} voteType={votetype(translation.id)} created={didCreate(translation.id)}/>)
            : props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={false} rating={translation.rating} id={translation.id} voteType={votetype(translation.id)} created={didCreate(translation.id)}/>)
        }
            </div>;


  }
  
  export default Translations;
  