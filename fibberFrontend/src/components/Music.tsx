import React, { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

function Music({ music }: { music: any }): ReactElement {
  const url = process.env.REACT_APP_BACKEND_URL;
  const { volumeMute, volumeLevel } = useSelector((state: { settings: any }) => state.settings);
  const [currentMusic, setCurrentMusic] = useState("");

  useEffect(() => {
    if (music) {
      setCurrentMusic(url + music.url);
    }
  }, [music, url]);

  return (
    <ReactPlayer
      className="music-player"
      volume={volumeLevel}
      loop
      playing={volumeMute}
      url={currentMusic}
    />
  );
}

export default Music;
