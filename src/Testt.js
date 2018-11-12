import React, { Component } from 'react';
class Testt extends Component{

  constructor(props){
    super(props);
    this.state = {
      counter:0
    };
    this.updateCount = this.updateCount.bind(this);
  }

  updateCount(event){
    if(event.target.value === 0){
      this.setState({
        counter: this.state.counter + 1
      });
    }else{
      this.setState({
        counter: this.state.counter - 1
      });
    }
    console.log(event.target.value);
  }

  render(){

    return(
      <div>
      <p>{this.state.counter}</p>
      <button value={0} onClick={this.updateCount}>Up</button>
      <button value={1} onClick={this.updateCount}>Down</button>
      </div>

    );

  }


}
export default Testt;
