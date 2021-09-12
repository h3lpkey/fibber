import React, { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function Music({ music }: { music: any }): ReactElement {
  const url = process.env.REACT_APP_BACKEND_URL;
  // const { volumeMute, volumeLevel } = useSelector((state: { settings: any }) => state.settings);
  const [currentMusic, setCurrentMusic] = useState("");

  useEffect(() => {
    if (music) {
      setCurrentMusic(url + music.url);
    }
  }, [music, url]);

  return (
    <ReactPlayer className="music-player" volume={100} loop playing={true} url={currentMusic} />
  );
}

export default Music;
