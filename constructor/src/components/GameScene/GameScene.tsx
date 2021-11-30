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

  const nextScenByToScene = (toScenes: TToScene[]) => {
    // const triggers = game.collectedTriggers;
    // console.log("triggers", triggers);
    const localToScenes: {
      TriggerSetter: string;
      TriggerGetter: string;
      ToScene: TScene;
    }[] = [];
    console.log("toScenes", toScenes);
    if (toScenes.length > 0) {
      toScenes.forEach((scene) => {
        console.log("scne", scene);
        if (scene.TriggerGetter) {
          const triggers = scene.TriggerGetter.split(" ");
          const displayToScene = triggers.reduce((prev, trigger) => {
            if (prev) {
              return game.collectedTriggers.includes(trigger);
            }
            return false;
          }, true);
          if (displayToScene) {
            localToScenes.push(scene);
          }
        } else {
          localToScenes.push(scene);
        }
      });
      console.log("localToScenes", localToScenes);

      if (localToScenes.length > 1) {
        let localToScene = localToScenes[0];

        localToScenes.forEach((scene) => {
          if (localToScene.TriggerGetter.length && scene.TriggerGetter) {
            const currentSceneWeight =
              localToScene.TriggerGetter.split(" ").length;
            const localWeight = scene.TriggerGetter.split(" ").length;
            console.log(currentSceneWeight);
            console.log(localWeight);
            if (currentSceneWeight < localWeight) {
              localToScene = scene;
            }
          }
        });
        console.log(localToScene);
        if (localToScene.TriggerSetter) {
          Dispatch(addGameTrigger(localToScene.TriggerSetter));
        }
        nextSceneById(localToScene.ToScene.id);
      } else {
        if (localToScenes[0].TriggerSetter) {
          Dispatch(addGameTrigger(localToScenes[0].TriggerSetter));
        }
        nextSceneById(localToScenes[0].ToScene.id);
      }
    }
  };

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
        nextScenByToScene(currentScene.ToScenes);
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
            {currentScene.Buttons?.map((button) => {
              if (button.TriggerGetter) {
                const triggers = button.TriggerGetter.split(" ");
                const displayButton = triggers.reduce((prev, trigger) => {
                  if (prev) {
                    return game.collectedTriggers.includes(trigger);
                  }
                  return false;
                }, true);
                if (displayButton) {
                  return (
                    <button
                      key={button.Text}
                      className="button"
                      onClick={() => {
                        if (button.TriggerSetter) {
                          Dispatch(addGameTrigger(button.TriggerSetter));
                        }
                        if (button.Scene) {
                          nextSceneById(button.Scene.id);
                        } else {
                          message.error("No set scene :(");
                        }
                      }}
                    >
                      {button.Text}
                    </button>
                  );
                }
              } else {
                return (
                  <button
                    key={button.Text}
                    className="button"
                    onClick={() => {
                      if (button.TriggerSetter) {
                        Dispatch(addGameTrigger(button.TriggerSetter));
                      }
                      if (button.Scene) {
                        nextSceneById(button.Scene.id);
                      } else {
                        message.error("No set scene :(");
                      }
                    }}
                  >
                    {button.Text}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScene;
