import { Button, message, Space, Spin } from "antd";
import { motion } from "framer-motion";
import { Tbutton, TScene, TToScene } from "models/scene";
import { StateGame, StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  addGameTrigger,
  removeGameTrigger,
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

  const animationVariants = {
    showNotification: {
      y: [0, 50],
      opacity: [0, 1],
    },
    hideNotification: {},
  };

  const sentence = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const [currentMusic, setCurrentMusic] = useState("");
  const [currentScene, setCurrentScene] = useState(scene);
  const [notificationAnimate, setNotificationAnimate] = useState(false);
  const [animatePerson, setAnimatePerson] = useState(false);

  useEffect(() => {
    setCurrentScene(scene);
    if (currentScene.Person.url === scene.Person.url) {
      setAnimatePerson(false);
    } else {
      setAnimatePerson(true);
    }
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
        volume={1}
        loop
        playing={game.music === "play"}
        url={scene.Music && `http://${url}:1337${scene.Music.url}`}
      />
    );
  };

  const removeTriggers = (triggers: string) => {
    triggers.split(" ").forEach((trigger: string) => {
      Dispatch(removeGameTrigger(trigger));
    });
  };

  const nextScenByToScene = (toScenes: TToScene[]) => {
    const localToScenes: TToScene[] = [];
    if (toScenes.length > 0) {
      toScenes.forEach((scene) => {
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

      if (localToScenes.length > 1) {
        let localToScene = localToScenes[0];

        localToScenes.forEach((scene) => {
          if (localToScene.TriggerGetter.length && scene.TriggerGetter) {
            const currentSceneWeight =
              localToScene.TriggerGetter.split(" ").length;
            const localWeight = scene.TriggerGetter.split(" ").length;
            if (currentSceneWeight < localWeight) {
              localToScene = scene;
            }
          }
        });
        if (localToScene.TriggerSetter) {
          Dispatch(addGameTrigger(localToScene.TriggerSetter));
        }
        if (localToScene.TriggerDelete) {
          removeTriggers(localToScene.TriggerSetter);
        }
        nextSceneById(localToScene.ToScene.id);
      } else {
        if (localToScenes[0].TriggerSetter) {
          Dispatch(addGameTrigger(localToScenes[0].TriggerSetter));
        }
        if (localToScenes[0].TriggerDelete) {
          removeTriggers(localToScenes[0].TriggerSetter);
        }
        nextSceneById(localToScenes[0].ToScene.id);
      }
    }
  };

  const nextSceneById = (id: number) => {
    const sceneFind = quest.Scenes.find((scene) => scene.id === id);
    if (sceneFind) {
      if (currentScene.Notification) {
        setNotificationAnimate(true);
        setTimeout(() => {
          setNotificationAnimate(false);
          Dispatch(setScene(sceneFind));
        }, 1500);
      } else {
        Dispatch(setScene(sceneFind));
      }
    }
  };

  return (
    <div
      className="scene"
      onClick={() => {
        nextScenByToScene(currentScene.ToScenes);
      }}
      key={currentScene.id}
    >
      <Menu />
      <MusicPlayer />
      {currentScene.Notification && notificationAnimate && (
        <div className="notification">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 50 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {currentScene.Notification}
          </motion.div>
        </div>
      )}
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
        <div className={`person ${scene.PersonPositionLeft && "person-left"}`}>
          <motion.div
            animate={{
              x: [scene.PersonPositionLeft ? 100 : -50, 0],
              opacity: [0.8, 1],
            }}
            transition={{
              duration: animatePerson ? 0.3 : 0,
              ease: "easeInOut",
            }}
          >
            <img
              src={`http://${url}:1337${currentScene.Person.url}`}
              alt="person"
            />
          </motion.div>
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
          <p className="dialog">
            <motion.p variants={sentence} initial="hidden" animate="visible">
              {currentScene.Text.split("").map((char, index) => {
                return (
                  <motion.span key={`${char}-${index}`} variants={letter}>
                    {char}
                  </motion.span>
                );
              })}
            </motion.p>
          </p>
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
                        if (button.TriggerDelete) {
                          removeTriggers(button.TriggerDelete);
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
                      if (button.TriggerDelete) {
                        removeTriggers(button.TriggerDelete);
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
