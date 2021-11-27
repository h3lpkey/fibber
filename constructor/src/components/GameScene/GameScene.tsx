import { Button, message, Space, Spin } from "antd";
import { Tbutton, TScene, TToScene } from "models/scene";
import { StateGame, StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  addGameTrigger,
  setGameMusicToggle,
  setScene,
  setSceneData,
} from "store/actions";
import "./GameScene.sass";

const GameScene = (): ReactElement => {
  const Dispatch = useDispatch();
  const url = window.location.hostname;
  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);
  const { game } = useSelector((state: { game: StateGame }) => state);

  const [currentMusic, setCurrentMusic] = useState("");
  const [currentScene, setCurrentScene] = useState(scene);

  useEffect(() => {
    setCurrentScene(scene);
  }, [scene]);

  if (scene === undefined || scene.id === undefined) {
    return (
      <Space align="center">
        <Spin size="large" />
      </Space>
    );
  }

  const Menu = () => {
    return (
      <Space className="config-buttons">
        <Button
          onClick={() => {
            Dispatch(setGameMusicToggle());
          }}
        >
          Music {game.music}
        </Button>
      </Space>
    );
  };

  const MusicPlayer = () => {
    return (
      <ReactPlayer
        className="music-player"
        volume={100}
        loop
        playing={game.music === "play"}
        url={scene.Music && `http://${url}:1337${scene.Music.url}`}
      />
    );
  };

  const nextScenByToScene = (toScene: TToScene) => {};
  const nextScenByButton = (button: Tbutton) => {};

  const nextSceneById = (id: number) => {
    const sceneFind = quest.Scenes.find((scene) => scene.id === id);
    if (sceneFind) {
      console.log("set scene", sceneFind);
      Dispatch(setScene(sceneFind));
    }
  };

  return (
    <div
      className="scene"
      onClick={() => {
        currentScene.ToScenes.forEach((toSceneLocal) => {
          nextScenByToScene(toSceneLocal);
          console.log("toSceneLocal", toSceneLocal);
        });
      }}
    >
      <Menu />
      <MusicPlayer />
      {currentScene.Background && (
        <div className="background">
          <img
            className="scene-background"
            src={`http://${url}:1337${currentScene.Background.url}`}
            alt="background"
          />
        </div>
      )}
      {currentScene.Person && (
        <div className="person">
          <img
            src={`http://${url}:1337${currentScene.Person.url}`}
            alt="person"
          />
        </div>
      )}
      <div
        className={`controls-wrap ${
          currentScene.PersonPositionLeft && "controls-wrap-reverse"
        }`}
      >
        {currentScene.PersonName !== "" && (
          <p
            className={`name ${
              currentScene.PersonPositionLeft && "name-reverse"
            }`}
          >
            {currentScene.PersonName}
            <span className="name-earth">_</span>
          </p>
        )}
        <div
          className={`controls ${
            currentScene.PersonPositionLeft && "controls-background-reverse"
          }`}
        >
          <p className="dialog">{currentScene.Text}</p>
          <div className="buttons">
            {currentScene.Buttons?.map((button) => (
              <button
                key={button.Text}
                className="button"
                onClick={() => {
                  if (button.Scene) {
                    nextSceneById(button.Scene.id);
                  } else {
                    message.error("No set scene :(");
                  }
                }}
              >
                {button.Text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScene;
