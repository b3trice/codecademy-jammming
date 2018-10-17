const CLIENT_ID = 'e90816d436014b669f29042c94478fbf';
const REDIRECT_URI = "http://localhost:3000/";

let accessToken = window.localStorage.getItem('accessToken');
if (window.localStorage.getItem('accessTokenExpireAt') < (new Date()).getTime()) {
  accessToken = null;
}
const Spotify = {
  getAccessToken: function() {
    if (accessToken) {
      return accessToken;
    }
    let m = window.location.href.match(/access_token=([^&]*)/);
    let m2 = window.location.href.match(/expires_in=([^&]*)/);
    if (m && m[1] && m2 && m2[1]) {
      accessToken = m[1];
      let expiresIn = m2[1];
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('accessTokenExpireAt', (new Date()).getTime() + (expiresIn * 1000));
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`);
    }
  },

  search: function (term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${Spotify.getAccessToken()}`}
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Empty array');
    }, networkError => console.log(networkError.message))
    .then(jsonResp => {
      // console.log(jsonResp);
      return jsonResp.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      });
    });
  },

  savePlaylist: function(playlistName, trackURIs) {
    // console.log('savePlaylist', playlistName, trackURIs);
    // playlistName = 'blah';
    if(!playlistName || !trackURIs) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    let headers = {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    };
    let userId;
    console.log('savePlaylist', accessToken);

    fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(jsonResp => {
      userId = jsonResp.id;
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name: playlistName })
      })
      .then(response => response.json())
      .then(jsonResp => {
        console.log(jsonResp);
        let playlistID = jsonResp.id;
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackURIs })
        })
      });
    });
  }
};
export default Spotify;
