import React, {useState, useEffect, useImperativeHandle} from 'react'; 
import queryString from 'query-string'; 
import io from 'socket.io-client'; 
import VideoPlayer from '../VideoPlayer/VideoPlayer.js'; 
import Chat from '../Chat/Chat.js'; 
import SearchBar from '../Searchbar';
import youtube from '../../apis/youtube';
import vimeo from '../../apis/vimeo';

let socket; 
const ENDPOINT = 'localhost:5000'; 

const Room = ({location}) => {
    const [name, setName] = useState(''); 
    const [room, setRoom] = useState(''); 
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(); 

    useEffect(() => {
        const {name, room} = queryString.parse(location.search); 
        console.log(name, room); 
        socket = io(ENDPOINT); 
        setName(name); 
        setRoom(room); 

        socket.emit('join', {name,room}); 

        return () => {
            socket.emit('disconnnect')
            socket.off(); 
            console.log('user has left'); 
        }
    }, [ENDPOINT, location.search]); 

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]); 

    const sendMessage = (event) => {
        event.preventDefault(); //prevent whole page refresh on change 

        if(message) {
            socket.emit('sendMessage', message, () => setMessage('')); 
        }
    }
    console.log(message, messages); 

    const handleSubmit = async (termFromSearchBar) => {
        console.log(termFromSearchBar); 
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        setVideos(response.data.items)
        console.log(videos);
    };

    const handleVideoSelect = (video) => {

        socket.emit('change', video, () => setSelectedVideo(video)); 
    }

    return(
        <div className="outercontainer">
            <div className="container">
                <Chat name={name} room={room} messages={messages} message={message} sendMessage={sendMessage} setMessage={setMessage} setMessages={setMessages}/>
                <SearchBar handleFormSubmit={handleSubmit}/>
                <VideoPlayer name={name} room={room} selectedVideo={selectedVideo} videos={videos} handleVideoSelect={handleVideoSelect} handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}

export default Room; 