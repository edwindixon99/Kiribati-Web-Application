import { useHistory } from "react-router-dom";
import './Style.css'


function PageCard({title, eDesc, kDesc, url}) {
  const history = useHistory();


    return <div className="col-12 col-md-6">
    <div className="card clickable-div h-100" onClick={() =>history.push(url)}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{eDesc}</p>
    <p className="card-text">{kDesc}</p>
  </div>
</div>
</div>
}

export default PageCard;