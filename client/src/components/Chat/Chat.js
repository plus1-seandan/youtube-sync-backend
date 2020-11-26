import React, {useState, useEffect} from 'react'; 
import queryString from 'query-string'; 
import io from 'socket.io-client'; 
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js'; 
import Input from '../Input/Input.js'; 
import Messages from '../Messages/Messages.js'; 
let socket; 
const ENDPOINT = 'localhost:5000'; 

const Chat = ({name,room,message,messages, setMessage, sendMessage}) => {

    return(
        <div className="outercontainer">
            <div className="container">
                <InfoBar room = {room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                {/* <input value={message} 
                onChange={(event) => setMessage(event.target.value)} 
                onKeyPress={event => event.key ==="Enter" ? sendMessage(event) : null}/> */}
            </div>
        </div>
    )
}

export default Chat; 