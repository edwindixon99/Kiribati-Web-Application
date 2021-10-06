import { Component } from "react";
import Translation from "./Translation"


class Translations extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return <div className="Translations container">
                {(this.props.lang == 'kiribati')
                ? this.props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={true} rating={translation.rating} id={translation.id}/>)
                : this.props.data.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} order={false} rating={translation.rating} id={translation.id}/>)
            }
                </div>;
    }

  }
  
  export default Translations;
  