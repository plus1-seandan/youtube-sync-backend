import axios from 'axios'; 
const KEY = "AIzaSyC4hibU19-UDI6Fl7pRCpQ3z3riN7m93EQ"; 

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params:{
        part:'snippet',
        maxResults:10,
        key: KEY
    }
}); 