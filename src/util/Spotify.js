const CLIENT_ID = 'e90816d436014b669f29042c94478fbf';
const REDIRECT_URI = "http://localhost:3000/";

let accessToken;

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
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`);
    }
  }
};

export default Spotify;