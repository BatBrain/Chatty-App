import React, {Component} from 'react';


const Message = React.createClass({
  render: function() {
    if (this.props.type === "incomingMessage") {
      return (
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
      )
    }
    if (this.props.type === "incomingNotification") {
      return (
        <div className="message system">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
      )
    } else {
      return (
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
      )
    }
    console.log('Rendering <Message />')
  }
});

export default Message;
