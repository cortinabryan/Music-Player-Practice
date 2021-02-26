import { songsList } from "../data/songs.js";

const Playlist = ((_) => {
  //data or state
  let songs = songsList;
  let currentPlayingIndex = 0;
  let currentSong = new Audio(songs[currentPlayingIndex].url);
  let isPlaying = false;

  // cache the DOM
  const playlistEl = document.querySelector(".playlist");
  const init = (_) => {};
  const render = (_) => {
    let markup = "";
    songs.forEach((songObj, index) => {
      markup += `<li class="playlist__song ${
        index === currentlyPlayingIndex ? "playlist__song--active" : ""
      }">
                <div class="play-pause">
                  <i class="fa fa-play pp-icon"></i>
                </div>
                <div class="playlist__song-details">
                  <span class="playList__song-name">${songObj.title}</span>
                  <br />
                  <span class="playList__song-artist">${songObj.artist}</span>
                </div>
                <div class="playlist__song-duration">${songObj.time}</div>
              </li>`;
    });
  };
  return {
    init,
  };
})();

export default Playlist;
