import React, {Component} from 'react';

// RegEx: match "/..." /(?:^\/)(\w+)/g   match second word when starts with "/username" /(?:^\/username\s)(\w+)/g

const UserName = React.createClass({
  getInitialState: function() {
    return ({username: "Anonymous"})
  },
  render: function() {
    return(
      <span>{this.props.username}
      <input type="hidden" id="username" value={this.props.username} />
      </span>
    );
  }
})

const NewMessage = React.createClass({
  render: function() {
    return(
      <input id="newmessage" type="text" placeholder="Type a message and hit ENTER" />
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
    //console.log(event.target.username.value)
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
