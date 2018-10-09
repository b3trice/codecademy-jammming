import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultvalue= {'New Playlist'}/>
         Add a TrackList component
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
