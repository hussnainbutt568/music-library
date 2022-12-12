import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { songsdata } from "./Audio";
import { useRef, useState, useEffect } from "react";
import { Button,  List } from "@mui/material";
import axios from "axios";
import { baseUrl } from "./helpers/config";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./App.css";

const About = () => {
  const [currentSong, setCurrentSong] = useState(songsdata[1]);
  const audioElem = useRef();
  const navigate = useNavigate();
  const [song, setSong] = useState([]);
  const [currentPlayingsong, setcurrentPlayingsong] = useState("");
  const [favSong, setfavSong] = useState([]);
  const bearer = localStorage.getItem("login");
  const [fav, setFav] = useState();
  const [uploadnewSong,setuploadSong]=useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptable files", acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const config = {
    headers: {
      Authorization: JSON.parse(bearer),
    },
  };
  const markFav = async (id) => {
    setFav(true);
    const marked = await axios
      .post(`${baseUrl}/api/v1/music/favourite/add/${id}`, config)
      .then((mark) => {
        getSong();
        getfavSong();
      })
      .catch((err) => {});
  };

  const markDel = async (id) => {
    setFav(false);
    const marked = await axios
      .delete(`${baseUrl}/api/v1/music/favourite/id/${id}`, config)
      .then((mark) => {
        getSong();
        getfavSong();
      })
      .catch((err) => {});
  };
  const getSong = async () => {
    const bearer = localStorage.getItem("login");

    const config = {
      headers: {
        Authorization: JSON.parse(bearer),
      },
    };
    try {
      const responseWorking = await axios.get(
        `${baseUrl}/api/v1/music/all`,
        config
      );
      setSong(responseWorking.data);
    } catch (error) {}
  };

  // const uploadSong = async () => {
  //   const bearer = localStorage.getItem("login");
 
  //   const config = {
  //     headers: {
  //       Authorization: JSON.parse(bearer),
  //     },
  //   };
  //   try {
  //     const responseWorking = await axios.post(
  //       `${baseUrl}/api/v1/music/upload`,
  //       config
  //     );
  //     setSong(responseWorking.data);
  //   } catch (error) {}
  // };

  const getfavSong = async () => {
    const bearer = localStorage.getItem("login");

    const config = {
      headers: {
        Authorization: JSON.parse(bearer),
      },
    };
    try {
      const responseWorking = await axios.get(
        `${baseUrl}/api/v1/music/favourite/all`,
        config
      );
      setfavSong(responseWorking.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSong();
    getfavSong();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    background: "#E0EDE4",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onPlaying = () => {
    const duration = audioElem.current.duration;

    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };
  const openMedia = (url) => {
    navigate("/OpenMedia", {
      state: url,
    });
  };
  const data = localStorage.getItem("login");

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          className="shadow"
          onClick={handleOpen}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 10,
            marginLeft: 13,
            borderRadius: 3,
            height:40,
            backgroundColor: "black",
            color: "white",
            borderColor: "black",
            "&:hover": {
              background: "#E0EDE4",
              color: "black",
            },
          }}
          {...getRootProps()}
        >
          {" "}
          <>
            {" "}
            <input {...getInputProps()} />
            {isDragActive ? <p></p> : <p>+ Upload Song</p>}
          </>
        </Button>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Upload your song here{" "}
              </Typography>
            </Box>
          </Modal>
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          className="shadow"
          style={{
            backgroundColor: "white",
            width: "40%",
            marginTop: "5%",
            minHeight: 200,
          }}
        >
          <h1>Playlist:{currentPlayingsong}</h1>

          <List
            sx={{
              height: 360,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
            }}
          >
            {song.map((data, id) => {
              return (
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                  }}
                >
                  <Button key={id} onClick={() => openMedia(data)}>
                    {data.fileName}
                  </Button>

                  <FavoriteIcon
                    onClick={() => {
                      data.favourite === true
                        ? markDel(data.id)
                        : markFav(data.id);
                    }}
                    sx={{
                      color: data.favourite === true ? "red" : "white",
                      height: 50,
                      width: 50,
                    }}
                  />
                </Box>
              );
            })}
          </List>
        </div>

        <div
          className="shadow"
          style={{
            backgroundColor: "white",
            width: "40%",
            marginTop: "5%",
            height: 465,
            minHeight: 200,
          }}
        >
          <h1>Favorite</h1>

          <List
            sx={{
              height: 450,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {favSong.map((data, id) => {
              return (
                <Button key={id} onClick={() => openMedia(data)}>
                  {data.fileName}
                </Button>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
};

export default About;
