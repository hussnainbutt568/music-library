import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";

function OpenMediaPlayer() {
  const location = useLocation();
  const { id, fileName,favourite, url } = location.state;
  const audioElem = useRef();


  const [songStatus, setSongStatus] = useState(favourite);
  const [fav, setFav] = useState();
  const bearer = localStorage.getItem("login");


  const [Fab, setFab] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          padding: 20,
          backgroundColor: "black",
          width: "50%",
          justifyContent: "center",
        }}
      >
        <Box>
          <img
            src="https://www.pngfind.com/pngs/m/137-1378394_music-note-free-png-image-outline-of-music.png"
            style={{ height: 400, width: 400, mt: 20 }}
          />
        </Box>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <audio controls>
            <source type="audio/ogg" src="song.ogg" />
            <source type="audio/mp3" src={url} />
          </audio>
        </Box>
      </div>
    </Box>
  );
}

export default OpenMediaPlayer;
