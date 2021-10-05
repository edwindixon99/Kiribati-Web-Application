import React from 'react';
import Navigation from './Navigation'
import Main from './Main';
import {RegisterProvider} from './RegisterContext'


function App() {
  

  return (
    <div className="App">
    <RegisterProvider>
      <Navigation></Navigation>
      <Main></Main>
    </RegisterProvider>
    </div>
  );
}

export default App;
