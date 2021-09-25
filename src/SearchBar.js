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
      };

    onSubmitTask = (e) => {
        e.preventDefault();
        if (this.state.query !== '') {
          fetch('localhost:4941/api/v1/english?q=hello')
          this.setState({
            query: ''
          });
        };
    
    }

    render() {
        const { task, tasks } = this.state;
    
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
                  />
                </div>
                <div className="col-2">
                  <button 
                  onSubmit={this.onSubmitTask} 
                  type="submit" 
                  className="btn btn-primary">ADD</button>
                </div>
              </div>
              </form>
              
              
            </div>
            
            
          </div>
        );
      }
}

export default SearchBar;