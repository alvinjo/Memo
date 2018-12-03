import React, { Component } from 'react';
import axios from 'axios';

class NotePage extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      id: -1,
      memos:[],
      newMemos:[],
      loaded:false
    }
    this.getUserByName = this.getUserByName.bind(this);
    this.makeElements = this.makeElements.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateMemo = this.updateMemo.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  deleteNote(event){
    event.preventDefault();
    var session = this;
    var delId = event.target[0].id;

    var headers = {'Content-Type': 'application/json'}
    axios.post('http://localhost:8080/Memo/api/memo/removeNote', delId, {headers:headers})
    .then(function (response){
      {session.getUserByName()}
    }).catch(function (error){
      console.log(error);
    });
  }


  getUserByName(){
    var session = this;
      axios.post('http://localhost:8080/Memo/api/memo/getUserByName', this.state.user)
      .then(function (response){
        session.setState({
          memos:response.data[0].memos,
          id:response.data[0].userId
        });
        {session.makeElements()}
      }).catch(function (error){
        console.log(error);
        console.log(error.response);
      });
  }


  updateMemo(event){
    event.preventDefault();
    var session = this;
    var noteId = event.target.id;
    var updatedNote = document.getElementById(noteId).value;
    noteId = parseInt(noteId);
    var userId = this.state.id;
    var headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}

    axios.put('http://localhost:8080/Memo/api/memo/updateNote',
    {"Id":noteId, "note":updatedNote, "userId":userId}, {headers:headers})
    .then(function (response){
      {session.getUserByName()}
    }).catch(function (error){
      console.log(error);
    });

  }

  makeElements(){
    var session = this;
    var elements = this.state.memos;
    var elementList = elements.map(function(note){
      return (
        <div>
          <br/>
          <form onSubmit={session.deleteNote}>
          <textarea id={note.Id}>{note.note}</textarea><br/>
          <button id={note.Id} onClick={session.updateMemo}>Update</button><button type="submit">Delete</button>
          </form>
        </div>
      );
    });

    this.setState({
      newMemos: elementList
    });

  }

  addNote(event){
    event.preventDefault();
    var session = this;
    var newNote = event.target[0].value;
    var userId = this.state.id;

    axios.post('http://localhost:8080/Memo/api/memo/addNote', {"note":newNote, "userId":userId})
    .then(function (response){
      {session.getUserByName()}
    }).catch(function (error){
      console.log(error);
      console.log(error.response);
    });
  }


  render(){
    const LoadData = () =>{
      if(!this.state.loaded){
        {this.getUserByName()}
        this.setState({
          loaded:true
        });
      }
      return(
        <div>
          {this.state.newMemos}
        </div>
      );
    }

    const AddNote = () =>{
      return(
        <div>
          <form onSubmit={this.addNote}>
            <textarea placeholder="New note..."/><br/>
            <button type="submit">Add</button>
          </form>
        </div>
      );
    }

    return(
      <div>
        <h1>{this.props.user}</h1>
        <AddNote/>
        <LoadData/>
      </div>
    );

  }

}
export default NotePage;
