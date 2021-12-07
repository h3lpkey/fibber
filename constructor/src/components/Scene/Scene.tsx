import { Button, message, Space, Spin } from "antd";
import API from "api/index";
import SceneForm from "components/SceneForm/SceneForm";
import { TQuest } from "models/quest";
import { StateQuests, StateScene } from "models/store";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuest, setScene } from "store/actions";
import "./Scene.sass";

const Scene = (): ReactElement => {
  const Dispatch = useDispatch();
  const url = window.location.hostname;
  const [editMode, setEditMode] = useState(false);

  const { quest } = useSelector((state: { quest: StateQuests }) => state.quest);
  const { scene } = useSelector((state: { scene: StateScene }) => state);

  if (scene === undefined || scene.id === undefined) {
    return (
      <Space align="center">
        <Spin size="large" />
      </Space>
    );
  }

  const ModeSwitcher = () => {
    return (
      <Space className="config-buttons">
        {editMode ? (
          <Button onClick={() => setEditMode(false)}>Preview</Button>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
      </Space>
    );
  };

  if (editMode) {
    return (
      <div>
        <ModeSwitcher />
        <SceneForm />
      </div>
    );
  } else {
    return (
      <div className="scene">
        <ModeSwitcher />
        {scene.Background && (
          <div className="background">
            <img
              className="scene-background"
              src={`http://${url}:1337${scene.Background.url}`}
              alt="background"
            />
          </div>
        )}
        {scene.Person && (
          <div className="person">
            <img src={`http://${url}:1337${scene.Person.url}`} alt="person" />
          </div>
        )}
        <div
          className={`controls-wrap ${
            scene.PersonPositionLeft && "controls-wrap-reverse"
          }`}
        >
          {scene.PersonName !== "" && (
            <p className={`name ${scene.PersonPositionLeft && "name-reverse"}`}>
              {scene.PersonName}
              <span className="name-earth">_</span>
            </p>
          )}
          <div
            className={`controls ${
              scene.PersonPositionLeft && "controls-background-reverse"
            }`}
          >
            <p className="dialog">{scene.Text}</p>
            <div className="buttons">
              {scene.Buttons.map((button: any) => (
                <button
                  key={button.Text}
                  className="button"
                  onClick={() => {
                    const scene = quest.Scenes.find(
                      (scene) => scene.id.toString() === button.Scene.id
                    );
                    if (scene) {
                      Dispatch(setScene(scene));
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
  }
};

export default Scene;
