import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import { Card, message } from "antd";
import API from "api";
import SceneForm from "components/SceneForm/SceneForm";
import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateQuests, StateScene } from "models/store";
import { memo, useState } from "react";
import { Handle } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { setQuest, setScene } from "store/actions";
import "./CustomNode.sass";

let initialValues;

export default memo(
  ({
    data,
    isConnectable,
  }: {
    data: { label: string; property: TScene; onChange: () => void };
    isConnectable: any;
  }) => {
    const Dispatch = useDispatch();
    const [showStatus, setShowStatus] = useState<boolean>(false);

    const { quest } = useSelector(
      (state: { quest: StateQuests }) => state.quest
    );
    const { scene } = useSelector((state: { scene: StateScene }) => state);

    if (data.property) {
      initialValues = {
        ToSceneId: data.property.ToSceneId,
        Notification: data.property.Notification,
        PersonPositionLeft: data.property.PersonPositionLeft,
        PersonName: data.property.PersonName,
        Text: data.property.Text,
        Background: data.property.Background ? data.property.Background.id : "",
        Person: data.property.Person ? data.property.Person.id : "",
        Music: data.property.Music ? data.property.Music.id : "",
        Buttons: data.property.Buttons.map((button) => {
          return {
            Text: button.Text,
            Scene: button.Scene?.id,
            GlobalTriggerNameSetter: button.GlobalTriggerNameSetter,
            GlobalTriggerNameGetter: button.GlobalTriggerNameGetter
              ? button.GlobalTriggerNameGetter.split(" ")
              : "",
          };
        }),
      };
    } else {
      initialValues = {
        ToSceneId: "",
        Notification: "",
        PersonPositionLeft: false,
        PersonName: "",
        Text: "",
        Background: "",
        Person: "",
        Music: "",
        Buttons: [],
      };
    }

    const buttonLinked = (params: any) => {
      const sceneButton = quest.Scenes.find((scene) => {
        return scene.id.toString() === params.source;
      });
      const toScene = quest.Scenes.find((scene) => {
        return scene.id.toString() === params.target;
      });
      if (sceneButton && toScene) {
        const newSceneParams = sceneButton;
        // @ts-ignore: Unreachable code error
        newSceneParams.Buttons[params.sourceHandle].Scene = toScene.id;
        API.scene.updateScene(sceneButton.id, newSceneParams).then(() => {
          API.quest.getQuestById(quest.id).then((questData: TQuest) => {
            Dispatch(setQuest(questData));
            const updateScene = questData.Scenes.find(
              (newScene) => newScene.id.toString() === sceneButton.id.toString()
            );
            Dispatch(setScene(updateScene));
            message.success(`Save success`);
          });
        });
      }
    };

    const Handles = () => {
      if (data.property) {
        return (
          <>
            <Handle
              type="target"
              position="top"
              style={{ background: "#555", width: 30, height: 30, top: -15 }}
              isConnectable={isConnectable}
            />
            {data.property.ToSceneId && (
              <Handle
                type="source"
                position="bottom"
                id="a"
                style={{
                  left: 0,
                  background: "#8b73fa",
                  width: 30,
                  height: 30,
                  bottom: -15,
                }}
                isConnectable={isConnectable}
              />
            )}
            {data.property.Buttons.map((Button, index) => {
              return (
                <Handle
                  type="source"
                  position="bottom"
                  id={index.toString()}
                  key={index.toString()}
                  onConnect={(params) => buttonLinked(params)}
                  style={{
                    left: index * 100 + 100,
                    background: "#555",
                    width: 30,
                    height: 30,
                    bottom: -15,
                  }}
                  isConnectable={isConnectable}
                >
                  {Button.Text}
                </Handle>
              );
            })}
          </>
        );
      } else {
        return (
          <Handle
            type="target"
            position="top"
            style={{ background: "#555", width: 30, height: 30, top: -15 }}
            isConnectable={isConnectable}
          />
        );
      }
    };

    return (
      <Card
        className="map-card"
        title={initialValues.Text}
        extra={
          showStatus ? (
            <EyeOutlined onClick={() => setShowStatus(!showStatus)} />
          ) : (
            <EyeInvisibleOutlined onClick={() => setShowStatus(!showStatus)} />
          )
        }
      >
        {showStatus && <SceneForm data={scene} />}
        <Handles />
      </Card>
    );
  }
);
