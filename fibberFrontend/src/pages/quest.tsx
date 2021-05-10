// If you don't want to use TypeScript you can delete this file!
import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import Header from "components/Header";
import API from "api";
import Scene from "components/Scene";

function Quest(): ReactElement {
  let { sceneId }: { sceneId: string } = useParams();
  const [scene, setScene] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [scenes, setScenes] = useState<any>([]);

  useEffect(() => {
    API.quest.getQuests().then((data) => {
      console.log(data);
      setScene(data[0].Scenes[sceneId]);
      setScenes(data[0].Scenes);
      setLoading(false);
    });
  }, []);

  const setSceneById = (id: number) => {
    const fndScene = scenes.find((scene: any) => {
      return scene.id === id;
    });
    setScene(fndScene);
  };

  return (
    <>
      <Header />
      {!loading && <Scene scene={scene} setSceneById={setSceneById} />}
    </>
  );
}

export default Quest;
