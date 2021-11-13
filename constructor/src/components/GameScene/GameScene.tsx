import { Button, Space, Spin } from "antd";
import { TScene } from "models/scene";
import { StateGame, StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setGameMusicToggle, setScene } from "store/actions";
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

  const nextScene = (scene: TScene) => {
    Dispatch(setScene(scene));
  };

  return (
    <div className="scene">
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
            {currentScene.Buttons.map((button: any) => (
              <button
                key={button.Text}
                className="button"
                onClick={() => {
                  const scene = quest.Scenes.find(
                    (scene) => scene.id === button.Scene.id
                  );
                  if (scene) {
                    nextScene(scene);
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
