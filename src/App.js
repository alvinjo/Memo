import React, { Component } from 'react';
import './App.css';
//import Test from './Test.js'
//import Testt from './Testt.js'
import New from './New.js'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "asd"
    }
    this.print = this.print.bind(this);
  }


  print(){
    console.log(this.state.name);
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
