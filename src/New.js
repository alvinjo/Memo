import React, { Component } from 'react';
import Test from './Test.js';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Register from './Register.js';
import NotePage from './NotePage.js';

class New extends Component{


  constructor(props){
    super(props);
    this.state = {
      user: "#",
      displayView: 0,
      newText: "",
      box: []
    };

    this.loginPress = this.loginPress.bind(this);
    this.saveText = this.saveText.bind(this);
    this.grabUserAccounts = this.grabUserAccounts.bind(this);
    this.registerPress = this.registerPress.bind(this);
    this.homePress = this.homePress.bind(this);
  }

  grabUserAccounts(cred){
    var session = this;
    axios.get('http://localhost:8080/Memo/api/memo/getUsersAll').then(function (response){
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if(results[i].username === cred.user && results[i].password === cred.pass){
          session.setState({displayView: 1});
        }
      }

    });
  }



  loginPress(event){
    event.preventDefault();
    var cred = {
      user: event.target[0].value,
      pass: event.target[1].value,
    };
    this.setState({
      user: cred.user
    });
    // console.log(this.state.user + ":" + this.state.pass);
    {this.grabUserAccounts(cred)}
  }

  saveText(event){
    event.preventDefault();
    this.setState({
      newText: event.target[0].value
    });
  }

  registerPress(){
    this.setState({
      displayView: 2
    });
  }


  homePress(){
    this.setState({
      displayView:0
    });
  }


  render(){
    const StoredNotes = (props) =>{
      return(
        <div>
          <textarea>{props.text}</textarea>
        </div>
      );
    }
    StoredNotes.defaultProps = {text:"#"}

    const Textbox = (props) => {
      return (
        <div>
          <form onSubmit={this.saveText}>
            <textarea/>
            <br/>
            <button type="submit">Save</button>
          </form>

          <p>{this.state.newText}</p>
          <StoredNotes text={this.state.newText}/>
        </div>
      );
    }


      const Login = (props) =>{
        return (
          <div>
          <form onSubmit={this.loginPress}>
            Username:<input></input>
            <br/>
            Password:<input></input>
            <br/>
            <button type="submit">login</button>
          </form>
          <button onClick={this.registerPress}>register</button>
          <h1>{props.user}:{props.pass}</h1>
          </div>
        );
      }

    return(
      <div>
      {this.state.displayView===0 && <Login user={this.state.user} pass={this.state.pass}/>}
      {this.state.displayView===1 && <NotePage user={this.state.user}/>}
      {this.state.displayView===2 && <Register homePress={this.homePress}/>}
      </div>
    );
  }

  componentWillReceiveProps(){

  }

}
export default New;
