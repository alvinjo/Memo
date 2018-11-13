import React, { Component } from 'react';

class New extends Component{



  constructor(props){
    super(props);
    this.state = {
      user:"#",
      pass:"#",
      validCred:false,
      newText: ""
    };


    this.buttonPress = this.buttonPress.bind(this);
    this.saveText = this.saveText.bind(this);
  }


  buttonPress(event){
    event.preventDefault();
    this.setState({
      user: event.target[0].value,
      pass: event.target[1].value,
      validCred: true //##############requires db validation
    });
    console.log(this.state.user + ":" + this.state.pass);
  }

  saveText(event){
    event.preventDefault();
    this.setState({
      newText: event.target[0].value
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
    StoredNotes.defaultProps = {text:"."}

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


      const Login = () =>{
        return (
          <div>
          <form onSubmit={this.buttonPress}>
            Username:<input></input>
            <br/>
            Password:<input></input>
            <br/>
            <button type="submit">login</button>
          </form>
          <h1>{this.state.user}:{this.state.pass}</h1>
          </div>
        );
      }

    return(
      <div>
      {!this.state.validCred && <Login/>}
      {this.state.validCred && <Textbox/>}
      </div>
    );
  }

  componentWillReceiveProps(){

  }

}
export default New;
