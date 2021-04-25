// If you don't want to use TypeScript you can delete this file!
import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import SceneInterface from "models/quest";
import Header from "components/header";
import API from "api";

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

  return (
    <>
      <Header />
      {!loading && (
        <div className="scene">
          <img
            className="scene-background"
            src={`http://localhost:1337${scene.Background.url}`}
            alt=""
          />
          <img className="scene-person" src={`http://localhost:1337${scene.Person.url}`} alt="" />
          <div className="scene-controls-box">
            <p className="scene-person-name">{scene.personName}:</p>
            <p className="scene-text">{scene.text}</p>
            <br />
            <p>Вы:</p>
            <div className="scene-buttons">
              {scene.Buttons.map((button: any) => (
                <button
                  key={button.Text}
                  className="scene-buttons_button"
                  onClick={() => {
                    setScene(
                      scenes.find((scene: any) => {
                        return scene.sceneId === button.link;
                      })
                    );
                  }}>
                  {button.Text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Quest;
