import React, {useState, useEffect} from 'react'; 
import io from 'socket.io-client'; 
import SearchBar from '../Searchbar';
import youtube from '../../apis/youtube';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import queryString from 'query-string'; 

const ENDPOINT = 'localhost:5000'; 
const socket = io(ENDPOINT); 

const VideoPlayer = (name, room, videos, selectedVideo, handleVideoSelect, handleSubmit) => {
    // useEffect(() => {
    //     socket.on('changeVideo', (video) => {
    //         console.log('recieved changeVideo call'); 
    //         console.log(video); 
    //         setSelectedVideo(video)
    //     })
    // }, [selectedVideo]); 

    return (
        <div className='ui container' style={{marginTop: '1em'}}>
        {/* <SearchBar handleFormSubmit={handleSubmit}/> */}
        <div className='ui grid'>
            <div className="ui row">
                <div className="eleven wide column">
                    <VideoDetail video={selectedVideo}/>
                </div>
                <div className="five wide column">
                    <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default VideoPlayer; 