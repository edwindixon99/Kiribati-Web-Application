import Translations from './Translations'
import SearchBar from './SearchBar'
import { Component } from 'react';
import { render } from '@testing-library/react';


// let trans = [    
//   {
//   "kiribati": "ti a boo",
//   "english": "good-bye",
//   "rating": 0.5
// },
// {
//   "kiribati": "a",
//   "english": "indicating immediate past",
//   "rating": 0.5
// },
// {
//   "kiribati": "a",
//   "english": "they",
//   "rating": 0.5
// }
// ];
class App extends Component {
  constructor() {
    super();
    this.state = {
      translations: null 
    }
  }
  handleChange(e) {
    this.setState({translations: e.target.value})
  
  }

  render() {
    return (
      <div className="App">
          <SearchBar handleChange={this.handleClick.bind(this)} value={this.state.translations}/>
          <Translations value={this.state.translations}/>
      </div>
    );
  }
  
}

export default App;
