import { songsList } from "../data/songs.js";

const Playlist = ((_) => {
  //data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  // cache the DOM
  const playlistEl = document.querySelector(".playlist");
  const init = (_) => {
    render();
    listeners();
  };

  const changeAudioSrc = (_) => {
    currentSong.src = song(currentPlayingIndex).url;
  };

  const togglePlayPause = (_) => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  };

  const mainPlay = (clickedIndex) => {
    if (currentlyPlayingIndex === clickedIndex) {
      console.log("Same");
      togglePlayPause();
    } else {
      console.log("new");
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
    }
  };

  const listeners = (_) => {
    // 1. get the index of the li tag
    // 2. change the currentplayingindex to index of the li tag
    // 3. play or pause
    // 4. If it's not the same song, then change the src to that new song after changing the currentplay index
    playlistEl.addEventListener("click", (event) => {
      if (event.target && event.target.matches(".fa")) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(
          listElem
        );
        mainPlay(listElemIndex);
        render();
      }
    });
  };

  const render = (_) => {
    let markup = "";

    const toggleIcon = (itemIndex) => {
      if (currentlyPlayingIndex === itemIndex) {
        return currentSong.paused ? "fa-play" : "fa-pause";
      } else {
        return "fa-play";
      }
    };
    songs.forEach((songObj, index) => {
      markup += `
      <li class="playlist__song ${
        index === currentlyPlayingIndex ? "playlist__song--active" : ""
      }">
                <div class="play-pause">
                  <i class="fa ${toggleIcon(index)} pp-icon"></i>
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
