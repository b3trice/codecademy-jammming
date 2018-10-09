import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Buba',
        artist: 'Betrice',
        album: 'Christmas bubble tea',
        id: 1
      }],
      playlistName: '',
      playlistTracks: [{
        name: 'Bunny',
        artist: 'Reynard',
        album: 'HIhiHihi',
        id:2
      }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  removeTrack(track) {
    this.state.playlistTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
  }

  updatePlaylistName(name) {
    this.state.playlistName = name;
  }

  savePlaylist() {
    const trackURIs = [this.state.playlistTracks];
    this.state.savePlaylist = ([trackURIs], this.state.playlistName);
  }

  search(condition) {
    console.log(condition ? true : false)
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          SearchBar
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
