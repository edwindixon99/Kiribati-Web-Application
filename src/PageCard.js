import { useHistory } from "react-router-dom";


function PageCard({title, eDesc, kDesc, url}) {
  const history = useHistory();


    return <div className="col">
      <div className="card" style={{cursor:"pointer"}} onClick={() =>history.push(url)}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{eDesc}</p>
    <p className="card-text">{kDesc}</p>
  </div>
</div>
</div>
}

export default PageCard;