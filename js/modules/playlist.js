import { songsList } from "../data/songs.js";
import PlayInfo from "../modules/play-info.js";

const Playlist = ((_) => {
  //data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  currentSong.currentTime = 60;

  // cache the DOM
  const playlistEl = document.querySelector(".playlist");

  const init = (_) => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused,
    });
  };

  const changeAudioSrc = (_) => {
    currentSong.src = songs[currentlyPlayingIndex].url;
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

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused,
    });
  };

  const playNext = (_) => {
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      currentSong.src = songs[currentlyPlayingIndex].url;
      togglePlayPause();
      render();
    }
  };

  const listeners = (_) => {
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

    currentSong.addEventListener("ended", (_) => {
      playNext();
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
                  <span class="playlist__song-name">${songObj.title}</span>
                  <br />
                  <span class="playlist__song-artist">${songObj.artist}</span>
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
