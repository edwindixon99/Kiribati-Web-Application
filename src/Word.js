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

    return <div className="clickable-div" onClick={goToWord}><h2>{word}</h2></div>
    

  }
  
  export default Word;