import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import './Style.css'


function GoBack({}) {
  const history = useHistory();


    return <div>
            <FontAwesomeIcon className="clickable-div" icon={faArrowLeft} onClick={() =>history.goBack()} size="lg"/>
            <br />

            </div>
}

export default GoBack;