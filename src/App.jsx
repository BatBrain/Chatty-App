import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};



const App = React.createClass({
  getInitialState() {
    return {data: data}
  },
  componentDidMount: function() {
  console.log("componentDidMount <App />");
  // setTimeout(() => {
  //   console.log("Simulating incoming message");
  //   // Add a new message to the list of messages in the data store
  //   //this.state.data.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
  //   // Update the state of the app component. This will call render()
  //   this.setState({data: this.state.data})
  // }, 3000);
},
onMessageSubmit: function(username, newmessage) {
  this.state.data.messages.push({username: username, content: newmessage})
  this.setState({data: this.state.data})
},
  render: function() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar username={this.state.data.currentUser.name} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
});

export default App;
