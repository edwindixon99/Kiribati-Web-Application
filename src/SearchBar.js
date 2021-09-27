import { Component } from "react";

class SearchBar extends Component {


    constructor() {
        super();
    
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
          this.props.handleSearch(e.target.value)
        };
      };

    onSubmitTask = (e) => {
        e.preventDefault();
        if (this.state.query !== '') {
          this.props.handleSearch(this.state.query)
        };
        console.log(this.state)
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
                    placeholder="Enter English Word/Phrase" 
                    id="taskInput"
                    autocomplete="off"
                  />
                </div>
                <div className="col-2">
                  <button 
                  onSubmit={this.onSubmitTask} 
                  type="submit" 
                  className="btn btn-primary">Search</button>
                </div>
              </div>
              </form>
              
              
            </div>
            
            
          </div>
        );
      }
}

export default SearchBar;