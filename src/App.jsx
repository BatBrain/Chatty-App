import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
var uuid = require('uuid');

var socket = new WebSocket("ws://localhost:3001/socketserver");

const App = React.createClass({
  getInitialState() {
    return {
      usersOnline: {number: "0"},
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{
          username: "Chat Bot",
          content: "Welcome to Chatty, human. Where no one cares what you have to say, because the machine uprising is coming soon...",
        }]
    }
  },

  componentDidMount: function() {

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          var messages = [...this.state.messages, data]
          this.setState({ messages })
          break;
        case "incomingNotification":
          // handle incoming notification
          if (data.action === "username") {
            var serverMessage = data
            var newUserName = {name: data.content}
            serverMessage.content = `${data.username} changed their name to ${data.content}`
            serverMessage.username = "Server says:"

            var messages = [...this.state.messages, serverMessage]
            this.setState({ currentUser: newUserName, messages: messages })
          } else if (data.action === "usrCountUpdate"){
            var usrCount = {number: data.content}
            this.setState({usersOnline: usrCount})
          } else {
            var messages = [...this.state.messages, data]
            this.setState({ messages })
          }
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
      //console.log("Message Recieved: ", event)
    }
  },

  onMessageSubmit: function(username, newmessage, type) {
    var type = "postMessage"
    var actn = "send"
    var message = newmessage
      if ((/(?:^\/)(\w+)/g).exec(newmessage)) {
        type = "postNotification"
        actn = (/(?:^\/)(\w+)/g).exec(newmessage)[1]
        message = newmessage.replace(/(?:^\/)(\w+\s)/g, "")
      }
    //console.log(type)
    var msg = {
      type: type,
      action: actn,
      username: `${username}`,
      content: `${message}`,
      id: uuid.v1(),
      date: Date.now()
    };
    socket.send(JSON.stringify(msg));
  },

  render: function() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
          <h4>Users Online: {this.state.usersOnline.number}</h4>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
});

export default App;
