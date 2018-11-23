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
    // this.deleteNoteFromState = this.deleteNoteFromState.bind(this);
  }

  deleteNote(event){
    event.preventDefault();
    var session = this;
    var delId = event.target[0].id;
    console.log(delId);
    console.log(event.target[0].innerHTML);

    var headers = {'Content-Type': 'application/json'}
    axios.post('http://localhost:8080/Memo/api/memo/removeNote', delId, {headers:headers})
    .then(function (response){
      console.log(response);
      {session.getUserByName()}
      // {session.deleteNoteFromState(delId)}
    }).catch(function (error){
      console.log(error);
    });
  }


  getUserByName(){
    console.log("asd");
    var session = this;
      axios.post('http://localhost:8080/Memo/api/memo/getUserByName', this.state.user)
      .then(function (response){
        // console.log(response);
        session.setState({
          memos:response.data[0].memos,
          id:response.data[0].userId
        });
        console.log(response.data[0].memos);
        {session.makeElements()} //Method call must remain here for it to execute sequentially.
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
    console.log(updatedNote);
    noteId = parseInt(noteId);
    var userId = this.state.id;
    var headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}

    axios.put('http://localhost:8080/Memo/api/memo/updateNote',
    {"Id":noteId, "note":updatedNote, "userId":userId}, {headers:headers})
    .then(function (response){
      console.log(response);
      {session.getUserByName()}
    }).catch(function (error){
      console.log(error);
    });

  }

  makeElements(){
    console.log("dsa");
    var session = this;
    var elements = this.state.memos;
    console.log(elements);
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

    console.log(this.state.newMemos);
  }

  // deleteNoteFromState(delId){
  //   console.log(this.state.newMemos.length);
  //   for (var i = 0; i < this.state.newMemos.length; i++) {
  //     if(this.state.newMemos[i].id === delId){
  //       console.log(this.state.newMemos[i].id);
  //       var updatedMemo = this.state.newMemos.splice(i, 1);
  //       this.setState({
  //         newMemos: updatedMemo
  //       });
  //     }
  //   }
  //   console.log(this.state.newMemos);
  // }


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

    return(
      <div>
        <h1>{this.props.user}</h1>
        <LoadData/>

      </div>
    );

  }


}
export default NotePage;
