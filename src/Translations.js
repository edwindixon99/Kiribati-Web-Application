import { Component } from "react";
import Translation from "./Translation"


class Translations extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        let translations = [    {
            "kiribati": "ti a boo",
            "english": "good-bye",
            "rating": 0.5
        },
        {
            "kiribati": "a",
            "english": "indicating immediate past",
            "rating": 0.5
        },
        {
            "kiribati": "a",
            "english": "they",
            "rating": 0.5
        }
    ];
        return <div className="Translations container">
                {this.props.translations.map((translation, i) => <Translation kiriPhrase={translation.kiribati} engPhrase={translation.english} />)}
                </div>;
    }

  }
  
  export default Translations;
  