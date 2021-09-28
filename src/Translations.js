import { Component } from "react";
import Translation from "./Translation"


class Translations extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return <div className="Translations container">
                {(this.props.lang == 'kiribati')
                ? this.props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={true}/>)
                : this.props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={false}/>)
            }
                </div>;
    }

  }
  
  export default Translations;
  