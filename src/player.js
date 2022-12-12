import { Box } from "@mui/material";
import React, { useState, useRef } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";   
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  muted,
  onClickMuted,
  onClickUnmuted,
  currentSong,
  setCurrentSong,
  songs, selectedSong,progress
}) => {
  const [progressBar, setProgress] = useState();


  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const [Fab, setFab] = useState(false);

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };


  return (
    <Box>
      <Box
        sx={{
          display: "coloumn",
          flex: "coloumn",
          backgroundColor: "white",
          height: 500,
          width: 500,
          marginLeft: "50%",
          marginTop: 20,
        }}
      >
        <div className="title">
          <p>{selectedSong}</p>
        </div>
        <div className="navigation">
          <div
            className="navigation_wrapper"
            onClick={checkWidth}
            ref={clickRef}
          >
            <div
              className="seek_bar"
              style={{ width: `${currentSong.progress + "%"}` }}
            ></div>
          </div>
        </div>
        <Box sx={{ height: 250, width: "100%", alignItems: "center" }}>
          <Box>
            <Box>
              <img
                src="https://www.pngfind.com/pngs/m/137-1378394_music-note-free-png-image-outline-of-music.png"
                style={{ height: 200, width: 200, marginTop: 20 }}
              />

             
              <h1>{progress}</h1>
            </Box>

            {muted === true ? (
              <VolumeOffIcon
                onClick={onClickUnmuted}
                style={{ height: 40, width: 30 }}
              />
            ) : (
              <VolumeUpIcon
                onClick={onClickMuted}
                style={{ height: 40, width: 30 }}
              />
            )}
            <BsFillSkipStartCircleFill
              className="btn_action"
              onClick={skipBack}
              style={{ height: 50, width: 60 }}
            />
            {isplaying ? (
              <BsFillPauseCircleFill
                style={{ height: 50, width: 60 }}
                className="btn_action pp"
                onClick={() => PlayPause()}
              />
            ) : (
              <BsFillPlayCircleFill
                className="btn_action pp"
                onClick={() => PlayPause()}
                style={{ height: 50, width: 60 }}
              />
            )}
            <BsFillSkipEndCircleFill
              className="btn_action"
              onClick={skiptoNext}
              style={{ height: 50, width: 60 }}
            />
            <FavoriteIcon
              onClick={() => setFab(!Fab)}
              sx={{
                color: Fab === true ? "red" : "black",
                height: 40,
                width: 30,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
