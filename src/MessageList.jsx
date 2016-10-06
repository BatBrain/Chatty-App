import React, {Component} from 'react';

import Message from './Message.jsx'

const MessageList = React.createClass({
  render: function() {
    console.log('Rendering <MessageList />')
    return (
      <div id="message-list">
      {this.props.messages.map( (message, i) => { return <Message key={i} {...message} /> })}
      </div>
    );
  }
});

export default MessageList;