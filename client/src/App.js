import React, { useEffect, useState } from "react";
import SearchBar from "./components/Searchbar";
import youtube from "./apis/youtube";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import Axios from "axios";
import Container from "@material-ui/core/Container";
//import Chat from './components/Chat/Chat';
import Join from "./components/Join/Join";
import Room from "./components/Room/Room";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    this.setState({
      videos: response.data.items,
    });
  };
  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <Container maxWidth="100%">
        <Router>
          <Route path="/" exact component={Join} />

          <Route path="/chat" component={Room} />
        </Router>
      </Container>
    );
  }
}

export default App;
