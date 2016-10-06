import React, {Component} from 'react';

const UserName = React.createClass({
  getInitialState: function() {
    return ({username: this.props.username})
  },
  handleChange: function(event) {
  //console.log("Shits changed bruh")
  this.setState({username: event.target.value});
},
  render: function() {
    return(
      <input id="username" type="text" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.handleChange}/>
    );
  }
})

const NewMessage = React.createClass({
  getInitialState: function() {
    return ({newmessage: ""})
  },
  handleChange: function(event) {
  //console.log("Shits changed bruh")
  this.setState({newmessage: event.target.value});
},
  render: function() {
    return(
      <input id="newmessage" type="text" placeholder="Type a message and hit ENTER" value={this.state.newmessage} onChange={this.handleChange}/>
    );
  }
})

const ChatBar = React.createClass({
  onSubmit: function(event) {
  event.preventDefault()
  let username = event.target.username.value;
  let message = event.target.newmessage.value;
  //console.log("Shits changed bruh")
  this.props.onMessageSubmit(username, message)
  event.target.newmessage.value = ""
},
  render: function() {
    console.log('Rendering <ChatBar />')
    return (
      <footer>
        <form onSubmit={this.onSubmit}>
        <UserName username={this.props.username}/>
        <NewMessage />
        <button type="submit" value="Submit"/>
        </form>
      </footer>
    );
  }
});

export default ChatBar;
