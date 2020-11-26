import React from 'react';
import ReactPlayer from 'react-player'; 
import io from 'socket.io-client'; 
//import ReactPlayer from 'react-player/youtube'; 

const ENDPOINT = 'localhost:5000'; 
const socket = io(ENDPOINT); 

class ResponsivePlayer extends React.Component {
	constructor ( props ) {
        super ( props )
        this.state= {
            playing: false,
        }
        //const url = props.url;
        socket.on('pauseVideo', (data) => {
            console.log('recieved broacast to pause video')
            this.setState({playing: false,})
        });
        socket.on('playVideo', (data) => {
            console.log('recieved broacast to play video')
            this.setState({playing: true,})
        });
	}

    handlePause(){
        let currentState = this.state; 
        console.log(currentState); 
        console.log('video paused'); 
        console.log(socket); 
        socket.emit('pause'); 
    }
    
    handlePlay(){
        this.setState({playing: true,})
        console.log('video play');
        socket.emit('play'); 
    }
    render(){
        return(
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={this.props.url}
                    width='100%'
                    height='100%'
                    playing={ this.state.playing}
                    onPause={this.handlePause.bind(this)}
                    onPlay={this.handlePlay.bind(this)}
                />
            </div>
        )
    }
}

export default ResponsivePlayer; 