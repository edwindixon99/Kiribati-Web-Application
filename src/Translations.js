import { Component } from "react";
import Translation from "./Translation"


class Translations extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return <div className="Translations container">
                {this.props.trans.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} />)}
                </div>;
    }

  }
  
  export default Translations;
  