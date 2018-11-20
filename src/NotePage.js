import React, { Component } from 'react';
import axios from 'axios';


class NotePage extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      id: -1
    }
    this.getUserByName = this.getUserByName.bind(this);
  }


  getUserByName(){
      axios.post('http://localhost:8080/Memo/api/memo/getUserByName', this.state.user)
      .then(function (response){
        console.log(response);
        console.log(response.data);
      }).catch(function (error){
        console.log(error);
        console.log(error.response);
      });
  }


render(){

  return(
    <div>
      <h1>{this.props.user}</h1>
      <button onClick={this.getUserByName}>press</button>
    </div>
  );

}


}
export default NotePage;
