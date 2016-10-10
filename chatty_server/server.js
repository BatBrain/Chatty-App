const chalk = require('chalk');
const log = function(text) {
  console.log(chalk.red.bold("WS:", text))
}

// server.js

const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });



wss.on('connection', (ws) => {
  log('Client connected');
  var count = wss.clients.length;
  var message = {
    type: "incomingNotification",
    action: "usrCountUpdate",
    content: count,
    date: Date.now()
  }
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(message));
  })
  ws.on('close', () => {
    log('Client disconnected')
    var count = wss.clients.length;
    var message = {
      type: "incomingNotification",
      action: "usrCountUpdate",
      content: count,
      date: Date.now()
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    })
  })
})

wss.on('message', function broadcast(message) {
  data = JSON.parse(message);
  log(data)

  switch(data.type) {
    case "postMessage":
    data.type = "incomingMessage"
    break;
    case "postNotification":
    data.type = "incomingNotification"
    break;
    default:
    // show an error in the console if the message type is unknown
    throw new Error("Unknown event type " + data.type);
  }
  log(`User ${data.username} sent: ${data.content}`)
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  })
})
