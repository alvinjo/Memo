import React, { Component } from 'react';
class Test extends Component{

  constructor(props){
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment(){
    this.setState({
      count: this.state.count+1
    });
  }

  reset(){
    this.setState({
      count: 0
    });
  }

  render(){

    return(

      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>Up</button>
        <button onClick={this.reset}>Reset</button>
      </div>

    );

  }

}
export default Test;
