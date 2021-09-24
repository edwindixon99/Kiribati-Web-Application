import { Component } from "react";
import Translation from "./Translation"


class Translations extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        let translations = [1,2,3,4];
        return <div className="Translations container">
                {translations.map((translation, i) => <Translation kiriPhrase='hi' engPhrase='hi' />)}
                </div>;
    }

  }
  
  export default Translations;
  