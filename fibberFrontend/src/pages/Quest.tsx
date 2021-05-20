// If you don't want to use TypeScript you can delete this file!
import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "components/Header";
import API from "api";
import Scene from "components/Scene";
import { setQuestScenes, setCurrentScene, setDefaultStyles } from "store/actions";
import Music from "components/Music";

function Quest(): ReactElement {
  let { sceneId }: { sceneId: string } = useParams();
  const [loading, setLoading] = useState(true);
  const { scene, scenes } = useSelector((state: { quest: any }) => state.quest);
  const dispatch = useDispatch();

  useEffect(() => {
    API.quest.getQuests().then((data) => {
      console.log(data);
      dispatch(setQuestScenes(data[0].Scenes));
      dispatch(setCurrentScene(data[0].Scenes[sceneId]));
      if (data[0].DefaultStyles) {
        dispatch(setDefaultStyles(data[0].DefaultStyles));
      }
      setLoading(false);
    });
  }, []);

  const setSceneById = (id: number) => {
    const fndScene = scenes.find((scene: any) => {
      return scene.id === id;
    });
    dispatch(setCurrentScene(fndScene));
  };

  return (
    <>
      <Header />
      {!loading && (
        <>
          <Scene setSceneById={setSceneById} />
          <Music music={scene.Music} />
        </>
      )}
    </>
  );
}

export default Quest;
