/*
 *
 * HomePage
 *
 */

import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import pluginId from "../../pluginId";
import Scene from "./components/Scene";

const HomePage = () => {
  const [quests, setQuests] = useState([]);
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    axios.get(`${strapi.backendURL}/${pluginId}/get-all-quests`).then(
      (response) => {
        const scenes = response.data.data[0].Scenes;
        setQuests(response.data.data[0]);
        setScenes(scenes);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h2>QUESTS:</h2>
      {scenes.map(scene => {
        return <Scene data={scene} />
      })}
      <pre>{JSON.stringify(scenes, null, " ")}</pre>
    </div>
  );
};

export default memo(HomePage);
