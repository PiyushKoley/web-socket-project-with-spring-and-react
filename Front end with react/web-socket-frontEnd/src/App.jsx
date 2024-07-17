import React, { useEffect, useState } from 'react';
import webSocketService from "./SocketService";

// import SockJS from "sockjs-client" ;
// import Stomp from "stompjs";

function App() {
  const [message, setMessage] = useState('');


  useEffect(() => {
    webSocketService.connect();
  }, []);

  const sendMessage = () => {
    webSocketService.sendMessage(message);
  };

  return (
    <>
      <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
    </>
  )
}

export default App

