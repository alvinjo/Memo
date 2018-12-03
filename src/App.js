import React, { Component } from 'react';
import './App.css';
import New from './New.js'

class App extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

        <New/>

        </header>
      </div>
    );
  }
}

export default App;
