import React, { Component } from 'react';
import Test from './Test.js'
import ReactDOM from 'react-dom'
import axios from 'axios';

class New extends Component{



  constructor(props){
    super(props);
    this.state = {
      user:"#", //not needed. can compare input value to db values directly without storing in state.
      pass:"#", //
      validCred:false,
      newText: "",
      box: []
    };

    this.buttonPress = this.buttonPress.bind(this);
    this.saveText = this.saveText.bind(this);
    this.addElement = this.addElement.bind(this);
    this.grabUserAccounts = this.grabUserAccounts.bind(this);
  }

  grabUserAccounts(){
    var session = this;
    axios.get('http://localhost:8080/Memo/api/memo/getUsersAll').then(function (response){
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if(results[i].username === session.state.user && results[i].password === session.state.pass){
          session.setState({validCred: true});
        }
      }

    });
  }


  // grabUserAccountsTwo = () =>{
  //   axios({
  //     url:'http://localhost:8080/Memo/api/memo/getUsersAll',
  //     method: 'get',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   }).then(function (response){
  //
  //   });
  // }


  buttonPress(event){
    event.preventDefault();
    this.setState({
      user: event.target[0].value,
      pass: event.target[1].value,
    });
    // console.log(this.state.user + ":" + this.state.pass);
    {this.grabUserAccounts()}
  }

  saveText(event){
    event.preventDefault();
    this.setState({
      newText: event.target[0].value
    });
  }

  addElement(){
    ReactDOM.render(<Test/>, document.getElementById("contain"));
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

          <button onClick={this.addElement}>Add Element</button>

          <div id="contain">

          </div>
        </div>
      );
    }


      const Login = (props) =>{
        return (
          <div>
          <form onSubmit={this.buttonPress}>
            Username:<input></input>
            <br/>
            Password:<input></input>
            <br/>
            <button type="submit">login</button>
          </form>
          <h1>{props.user}:{props.pass}</h1>
          </div>
        );
      }

    return(
      <div>
      {!this.state.validCred && <Login user={this.state.user} pass={this.state.pass}/>}
      {this.state.validCred && <Textbox/>}
      </div>
    );
  }

  componentWillReceiveProps(){

  }

}
export default New;
