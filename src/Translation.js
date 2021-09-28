import { Component } from "react";


class Translation extends Component {

    constructor(props) {
        super(props);
      }

    render() {
    return      <div className="Translation container">
                    <div className="row">
                        <div className="col-5">
                        {(this.props.order)
                        ? <h2>{this.props.kiriPhrase}</h2>
                        : <h2>{this.props.engPhrase}</h2>
                        }
                        </div>
                        <div className="col-5">
                        {(this.props.order)
                            ? <h2>{this.props.engPhrase}</h2>
                            : <h2>{this.props.kiriPhrase}</h2>
                        }
                        </div>
                        <div className="col-1">
                            
                        </div>
                        <div className="col-1">
                            
                        </div>
                    </div>
                </div>;
    }

  }
  
  export default Translation;
  