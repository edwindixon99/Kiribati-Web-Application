import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from "react";

class SearchBar extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
            query: '',
            translations: []
        };

    }


    handleChange = (e) => {
        this.setState({
          query: e.target.value
        });
        if (this.state.query !== '') {
          this.props.handleSearch(e.target.value, false)
        };
      };

    onSubmitTask = (e) => {
        e.preventDefault();
        if (this.state.query !== '') {
          this.props.handleSearch(this.state.query, true)
        };
        
    }

    render() {
        
    
        return (
          <div className="App">
            <div className="container">
    
              <form onSubmit={this.onSubmitTask}>
              <div className="row">
              
              
                <div className="col-10">
                  <input 
                    className="form-control form-control-lg"   
                    onChange={this.handleChange}
                    value={this.state.query} 
                    type="text"
                    placeholder={this.props.placeholder} 
                    id="taskInput"
                    autocomplete="off"
                  />
                </div>
                <div className="col-1">
                  <button 
                  type="submit"
                  style={{"font-size": "1.25rem"}}
                  className="btn btn-primary"><FontAwesomeIcon icon={faSearch}  size="lg"></FontAwesomeIcon></button>
                </div>
              </div>
              </form>
              
              
            </div>
            
            <br/>
            
          </div>
        
        );
      }
}

export default SearchBar;