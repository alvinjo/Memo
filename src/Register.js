import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{


  constructor(props){
    super(props);
    this.state = {
      message:"",
      registered:false
    }
    this.registerDetails = this.registerDetails.bind(this);
    // this.homePress = this.homePress.bind(this);
  }


  registerDetails(event){
    event.preventDefault();
    var session = this;
    axios.post('http://localhost:8080/Memo/api/memo/addUser',
    {"username":event.target[0].value, "password":event.target[1].value})
    .then(function (response){
      console.log(response);
      // document.getElementById("userAddMessage").innerHTML=response.data.message;
      session.setState({
        message:response.data.message,
        registered:true
      });
    }).catch(function (error){
      console.log(error);
      console.log(error.response);
    });
  }

  // homePress(){
  //   console.log(this.props.view);
  //   this.props.view = 1;
  // }


  render(){
    const Doing = () =>{
      return(
        <div>
          <form onSubmit={this.registerDetails}>
            Username: <input></input>
            Password: <input></input><br/>
            <button type="submit">Register Account</button>
          </form>
        </div>
      );
    }

    const Done = () =>{
      return(
        <div>
          <h1 id="userAddMessage">{this.state.message}</h1>
          <button onClick={this.props.homePress}>Home</button>
        </div>
      );
    }

    return(
      <div>
        {!this.state.registered && <Doing/>}
        {this.state.registered && <Done/>}
      </div>
    );
  }

}
export default Register;
