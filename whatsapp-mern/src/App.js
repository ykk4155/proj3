/* eslint-disable no-undef */
import React from "react";
import './App.css';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {

  const [messages, setMessages] = useState([]);
  const [logIn,setlogin] = useState(false);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('54600498535adbc951ff', {
      cluster: 'us2'
    });
    
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!logIn ? (
        <Login loginHandler={ (boolean)=> setlogin(boolean)}/>
      ) : (
        <div className="app__body">
          <Router>
              <Sidebar />
              <Switch>
                <Route path="/">
                  <Chat messages={messages}/>
              </Route>
              </Switch>
          </Router>
        </div>
      )}
      
    </div>
  );
}
export default App;
